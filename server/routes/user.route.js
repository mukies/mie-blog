const express = require("express");
const {
  register,
  login,
  logout,
  followUnfollow,
  updateProfile,
  changePassword,
  getUser,
  getFollowers,
  changeProfileAndCover,
  searchUser,
  userSuggestion,
  adminGetAllUsers,
} = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/follow-unfollow/:id", protectedRoute, followUnfollow);
router.put("/update-profile", protectedRoute, updateProfile);
router.put("/change-profile-and-cover", protectedRoute, changeProfileAndCover);
router.put("/change-password", protectedRoute, changePassword);
router.get("/followers/:id", protectedRoute, getFollowers);
router.get("/search-user/:key", protectedRoute, searchUser);
router.get("/user-suggestion", protectedRoute, userSuggestion);
router.get("/get-user/:username", protectedRoute, getUser);

module.exports = router;
