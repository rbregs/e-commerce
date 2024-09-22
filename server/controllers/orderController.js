import catchAssyncErrors from "../middlewares/catchAssyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order  =>  /api/v1/orders/new
export const newOrder = catchAssyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get current user orders  =>  /api/v1/me/orders
export const myOrders = catchAssyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

// Get order details  =>  /api/v1/orders/:id
export const getOrderDetails = catchAssyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    order,
  });
});

// Get all orders - ADMIN  =>  /api/v1/admin/orders
export const allOrders = catchAssyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

// Update Order - ADMIN  =>  /api/v1/admin/orders/:id
export const updateOrder = catchAssyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  let productNotFound = false

  // Update products stock
  // await Promise.all(order.orderItems.map(async (item) => {
  //   const product = await Product.findById(item.product.toString());
  //   if (!product) {
  //     productNotFound =true
  //     break
  //   }
  //   product.stock = product.stock - item.quantity;
  //   await product.save({ validateBeforeSave: false });
  // }));

  for (const item of order.orderItems) {
    const product = await Product.findById(item.product.toString());
    if (!product) {
      productNotFound = true;
      break; 
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  if (productNotFound) {
    return next(new ErrorHandler("No Product found with this ID", 404));
  }

  // Update order status and delivery date
  order.orderStatus = req.body.orderStatus; // Extract orderStatus from req.body
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});


// Delete order  =>  /api/v1/admin/orders/:id
export const deleteOrder = catchAssyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

//salesFunction

// Function to get sales data based on date range
async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      // Stage 1: Filter orders by creation date
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      }
    },
    {
      // Stage 2: Group orders by date and calculate total sales and number of orders
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        },
        totalSales: { $sum: '$totalAmount' },
        numOrder: { $sum: 1 } // Count the number of orders
      }
    }
  ]);

  //create a map tp store sales data and number of order by data
  const salesMap = new Map()

  let totalsales = 0
  let totalNumOrders = 0


  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrder;

    salesMap.set(date, { sales, numOrders })
    totalsales += sales
    totalNumOrders += numOrders
  })

  //generate array of date between start & end date
  const datesBetween = getDatesBetween(startDate, endDate)

  //create final sales data array with o for dates without sale
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders
  }))

  return { salesData: finalSalesData, totalsales, totalNumOrders }
}

function getDatesBetween(startDate, endDate) {
  let dates = []
  let currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0]
    dates.push(formattedDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }


  return dates;
}

// Get sales data for the given date range => /api/v1/admin/get_sales
export const getSales = catchAssyncErrors(async (req, res, next) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  const { salesData, totalsales, totalNumOrders } = await getSalesData(startDate, endDate);

  res.status(200).json({
    success: true,
     
    totalNumOrders, 
    totalsales,
    sales: salesData,
  });
});
