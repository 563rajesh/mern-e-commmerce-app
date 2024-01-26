const express = require("express");
const router = express.Router();
const {
  getProductDetails,
  getProducts,
  createProduct,
  adminAllProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productsController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

//user route for all products
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetails);

//admin route
router.route("/admin/product/new").post(protect, isAdmin, createProduct);
router.route("/admin/products").get(protect, isAdmin, adminAllProducts);
router
  .route("/admin/product/:id")
  .get(protect, isAdmin, getProductDetails)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
//product review route
router.route("/review").put(protect, createProductReview).delete(deleteReview);
router.route("/reviews").get(getProductReviews);

module.exports = router;
