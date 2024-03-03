const express = require("express");
const {
  register,
  login,
  logout,
  followUnfollow,
  updateProfile,
  changePassword,
  getUser,
} = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/follow-unfollow/:id", protectedRoute, followUnfollow);
router.put("/update-profile", protectedRoute, updateProfile);
router.put("/change-password", protectedRoute, changePassword);
router.get("/:id", protectedRoute, getUser);

module.exports = router;
