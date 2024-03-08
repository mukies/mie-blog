const express = require("express");
const {
  addPost,
  addComment,
  likeUnlikePost,
  likeUnlikeComment,
  getAllPost,
  getOnePost,
  getFeedPost,
  userDeletePost,
  userDeleteComment,
  adminDeletePost,
  adminDeleteComment,
  getProfilePost,
} = require("../controllers/post.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");
const { adminProtection } = require("../middlewares/adminProtection");
const router = express.Router();
// get routes
router.get("/all", adminProtection, getAllPost);
router.get("/feed", protectedRoute, getFeedPost);
router.get("/profile-post/:username", protectedRoute, getProfilePost);
router.get("/:id", getOnePost);
// post routes
router.post("/add", protectedRoute, addPost);
router.post("/add-comment/:id", protectedRoute, addComment);
// update routes
router.put("/like-unlike/:id", protectedRoute, likeUnlikePost);
router.put(
  "/:id/comment/like-unlike/:index",
  protectedRoute,
  likeUnlikeComment
);

// delete routes
router.delete("/user-delete-post/:id", protectedRoute, userDeletePost);
router.delete(
  "/:postID/user-delete-comment/:id",
  protectedRoute,
  userDeleteComment
);
router.delete("/admin-delete-post/:id", protectedRoute, adminDeletePost);
router.delete(
  "/:postID/admin-delete-comment/:id",
  protectedRoute,
  adminDeleteComment
);

module.exports = router;
