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
  
    // Update products stock
    await Promise.all(order.orderItems.map(async (item) => {
      const product = await Product.findById(item.product.toString());
      if (!product) {
        return next(new ErrorHandler("No Product found with this ID", 404));
      }
      product.stock = product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    }));
  
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