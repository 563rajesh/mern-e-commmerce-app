const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { protect } = require("../middlewares/authMiddleware");

//router for all products
router.route("/products/new").post(protect, createProduct);
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProduct).delete(protect, deleteProduct);

module.exports = router;
