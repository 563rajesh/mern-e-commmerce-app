const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401);
    throw new Error("Please login to access this");
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decodedData.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Admin");
  }
});

module.exports = { protect, isAdmin };
