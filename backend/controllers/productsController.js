const asyncHandler = require("express-async-handler"); //mdleware
const Product = require("../models/ProductModel");

//Admin route to get all products
const adminAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(200).json({ success: true, products });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

//Admin route - create product
const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  if (product) {
    res.status(201).json({ success: true, product });
  } else {
    res.status(400);
    throw new Error("product not created");
  }
});

//Admin route - update product
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
  res.status(200).json({ success: true, product });
});

//Admin route - delete product
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

//User route to get all products
const getProducts = asyncHandler(async (req, res) => {
  const productsCount = await Product.countDocuments();

  const { query, category, price, page, rating, pageSize } = req.query;
  const filter = {};

  if (query) filter.name = { $regex: new RegExp(query, "i") };
  if (category) filter.category = category;
  if (price && price > 0) filter.price = { $lte: parseFloat(price) };
  if (rating) filter.rating = { $gte: parseFloat(rating) };

  const filteredProductsCount = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .skip((page - 1) * pageSize)
    .limit(parseInt(pageSize));

  if (!products) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json({
      filteredProductsCount,
      productsCount,
      products,
    });
  }
});

//get single product for both user and admin
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({ success: true, product });
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
    res.status(404);
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
    product.rating = (avg / product.reviews.length).toFixed(2);
  }

  await product.save();
  res.status(201).json({ success: true });
});

// Get All Reviews of a product
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.map((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

module.exports = {
  getProductDetails,
  getProducts,
  adminAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  deleteReview,
  getProductReviews,
};
