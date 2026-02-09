const asyncHandler = require("express-async-handler"); //middleware
const User = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User Already Exists !");
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  if (!user) {
    await cloudinary.v2.uploader.destroy(myCloud.public_id);
  }

  await user.save();

  sendToken(user, 201, res);
});

//Login user
const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking user has provided both password and email
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  //checking user & password , generating token
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  sendToken(user, 200, res);
});

//Logout user
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

//User get profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  //Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Wys password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.name} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error(error.message);
  }
});

//Reset password
const resetPassword = asyncHandler(async (req, res) => {
  // creating token hash(bcz token get here,not hashed )
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Reset Password Token is invalid or has been expired");
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400);
    throw new Error("Password do not match");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ success: true });
});

//User update profiel
const updateUserProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.json({
    success: true,
  });
});

//User update password
const updateUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const isMatchedPassword = await user.matchPassword(oldPassword);

  if (!isMatchedPassword) {
    res.status(404);
    throw new Error("Your old password incorrect");
  }

  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error("Password do not match");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ success: true });
});

//Update user role - admin route
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

//Delete user - admin route
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

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

//Get single user - admin route
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Get all user - admin route
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

module.exports = {
  authController,
  logout,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
  resetPassword,
};
