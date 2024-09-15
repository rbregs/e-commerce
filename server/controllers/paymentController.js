import catchAssyncErrors from "../middlewares/catchAssyncErrors.js";
import Stripe from 'stripe';
import product from "../models/product.js";

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
    metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
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
}); // <-- Correctly closed here
