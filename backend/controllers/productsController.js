const asyncHandler = require("express-async-handler"); //mdleware
const Product = require("../models/ProductModel");

//admin route for all products
const adminAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.status(200).json(products);
  }
});

//admin route
const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("product not created");
  }
});
//admin route
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await product.save();
  res.status(201).json(product);
});
//admin route
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});
//user route
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products && products.length === 0) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(products);
  }
});
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//Create New  Review and Update Product
const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating, productId } = req.body;
  const newReview = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  const isReviewed = product.reviews.find((rev) => rev.user === req.user._id);
  if (isReviewed) {
    product.reviews.map((rev) => {
      if (rev.user === req.user._id) {
        (rev.comment = comment), (rev.rating = Number(rating));
      }
    });
  } else {
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    let avg = 0;
    product.reviews.map((rev) => (avg += rev.rating));
    product.rating = avg / product.reviews.length;
  }
  await product.save();
  res.status(200).json({ success: true });
});

module.exports = {
  getProductDetails,
  getProducts,
  adminAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
