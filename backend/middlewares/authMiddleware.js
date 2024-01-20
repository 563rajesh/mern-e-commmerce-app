const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (token)
    try {
      const decodedData = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decodedData.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized,Token failed");
    }
  else {
    res.status(404);
    throw new Error("Not Authorized , Not Token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorize user");
  }
});

module.exports = { protect, isAdmin };
