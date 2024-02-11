const asyncHandler = require("express-async-handler"); //mdleware
const User = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User Already Exists !");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    sendToken(user, 201, res);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
//login user
const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking user has provided both password and email
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email & password");
  }
  const user = await User.findOne({ email }).select("+password");

  //checking user& password , generating token
  if (user && (await user.matchPassword(password))) {
    sendToken(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
//logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
//user route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
//user route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    res.json({
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//admin route
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//admin route - update user role
const updateUserRole = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({ success: true });
});
//admin route
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//admin route
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authController,
  logout,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
