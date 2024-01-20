const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middlewares/authMiddleware");
//Create new order
router.route("/order/new").post(protect, createOrder);
//getorderbyid
router.route("/order/:id").get(protect, getOrderById);
//getyourorders
router.route("/orders/myorders").get(protect, getMyOrders);

//admin route
router.route("/admin/orders").get(protect, isAdmin, getAllOrders);
//update order
router
  .route("/admin/order/:id")
  .put(protect, isAdmin, updateOrderStatus)
  .delete(protect, isAdmin, deleteOrder);

module.exports = router;
