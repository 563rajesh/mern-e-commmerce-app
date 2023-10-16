const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler"); //mdleware
const Product = require("../models/ProductModel");

//router for all products
router.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
router.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  })
);
module.exports = router;
