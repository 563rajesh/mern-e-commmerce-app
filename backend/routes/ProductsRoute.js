const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
} = require("../controllers/productsController");

//router for all products
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProduct);

module.exports = router;
