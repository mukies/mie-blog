const express = require("express");
const {
  register,
  login,
  logout,
  followUnfollow,
} = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/follow-unfollow/:id", protectedRoute, followUnfollow);

module.exports = router;
