import catchAssyncErrors from "../middlewares/catchAssyncErrors.js";
import Order from "../models/orderModel.js"
import Stripe from 'stripe';

// create stripe checkoutSession => ap1/v1/payment/checkout_payment
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckOutSession = catchAssyncErrors(async (req, res, next) => {
  const body = req?.body;

  const line_items = body?.orderItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          images: [item?.image],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: ["txr_1PzB7kRu1641j7wo7gosV3ca"],
      quantity: item?.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo;

  const shipping_rate =
    body?.itemsPrice >= 200
      ? "shr_1PzB15Ru1641j7wozw3OnndT"
      : "shr_1PzB1ZRu1641j7wodG8Lq3nL";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata: { ...shippingInfo, itemPrice: body?.itemPrice },
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url,
  });
}); 

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      // console.log ("=========================")
      // console.log('item',item)
      // console.log ("=========================")
      // console.log('product',product)
      // console.log ("=========================")
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};


//create new order after payment => /api/v1/payment/checkout_session
export const stripeWebhook = catchAssyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
            // console.log ("=========================")
            //  console.log('Session ===>:', session)
            //  console.log ("=========================")
      const itemPrice = session.metadata.itemPrice; 
      

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNumber: session.metadata.phoneNumber,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };
            console.log ("=========================")
             console.log('orderData ===>:', orderData)
             console.log ("=========================")

      await Order.create(orderData);

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error => ", error);
  }
});