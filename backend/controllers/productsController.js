const asyncHandler = require("express-async-handler"); //mdleware
const Product = require("../models/ProductModel");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(400).json({ message: "Product not found" });
  }
});

module.exports = { getProduct, getProducts };
