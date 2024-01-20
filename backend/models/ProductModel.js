const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    brand: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    countInStock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxlength: [4, "Product Stock Not Exceed 4 digit"],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxlength: [8, "Price cannot exceed 8 digit"],
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
