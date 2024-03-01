const express = require("express");
const router = express.Router();
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
} = require("../controllers/usersController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

//user registration
router.route("/register").post(registerUser);

//email and password auth
router.route("/login").post(authController);
router.route("/logout").get(logout);
//get user profile private route
router.route("/profile").get(protect, getUserProfile);
router.route("/profile/update").put(protect, updateUserProfile);

//admin route
router.route("/admin/users").get(protect, isAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .get(protect, isAdmin, getSingleUser)
  .put(protect, isAdmin, updateUserRole)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
