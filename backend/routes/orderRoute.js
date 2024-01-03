const express = require("express");
const router = express.Router();
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");

const { protect } = require("../middlewares/authMiddleware");
router.route("/myorders").get(protect, getMyOrders);
//Create new order
router.route("/").post(protect, addOrderItem);
//getorderbyid
router.route("/:id").get(protect, getOrderById);
//update order
router.route("/:id/pay").put(protect, updateOrderToPaid);
//getyourorders
module.exports = router;
