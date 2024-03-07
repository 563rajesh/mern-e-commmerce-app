const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  logout,
  updateUserPassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/usersController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(authController);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/profile").get(protect, getUserProfile);

router.route("/profile/update").put(protect, updateUserProfile);

router.route("/password/update").put(protect, updateUserPassword);

//admin route
router.route("/admin/users").get(protect, isAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .get(protect, isAdmin, getSingleUser)
  .put(protect, isAdmin, updateUserRole)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
