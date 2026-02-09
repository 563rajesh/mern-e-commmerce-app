const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

//Create order
const createOrder = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  req.body.isPaid = true;

  const order = await Order.create(req.body);

  res.status(201).json({ success: true, order });
});

//Get single order details
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json({ success: true, order });
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//User get his orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.status(200).json({ success: true, orders });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

//Get all orders - admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders) {
    res.status(200).json({ success: true, orders });
  }
});

//Update orderStatus - admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.orderStatus === "Delivered") {
    res.status(400);
    throw new Error(`Order delivered at ${order.deliveredAt}`);
  }

  //save to database
  order.orderStatus = req.body.status;
  order.isDelivered = req.body.isDelivered;

  if (order.orderStatus === "Shipped") {
    order.orderItems.map(
      async (order) => await updateStock(order.product, order.qty)
    );
  }

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

//Update stock
async function updateStock(id, qty) {
  const product = await Product.findById(id);
  product.countInStock -= qty;
  await product.save({ validateBeforeSave: false });
}

//Delete order - admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await Order.deleteOne({ _id: req.params.id });

  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
};
