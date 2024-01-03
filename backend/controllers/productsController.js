const asyncHandler = require("express-async-handler"); //mdleware
const Product = require("../models/ProductModel");

//admin route
const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const user = await Product.create(req.body);
  if (user) {
    res.status(201).json(user);
  }
});
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products && products.length != 0) {
    res.json(products);
  } else if (products.length === 0) {
    res.status(400);
    throw new Error("No Products Available");
  } else {
    res.status(404);
    throw new Error("Some Internal Error");
  }
});
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(400).json({ message: "Product not found" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const products = await Product.find({});
  const newProducts = products.filter((product) => product._id != id);
  if (newProducts) {
    await newProducts.save();
  }
});

module.exports = { getProduct, getProducts, createProduct, deleteProduct };
