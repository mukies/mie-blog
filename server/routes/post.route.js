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
  adminGetProfilePost,
  adminGetOnePost,
} = require("../controllers/post.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");
const { adminProtection } = require("../middlewares/adminProtection");
const router = express.Router();
// get routes
router.get("/all", adminProtection, getAllPost);
router.get("/feed", protectedRoute, getFeedPost);
router.get("/profile-post/:username", protectedRoute, getProfilePost);
router.get(
  "/admin-profile-post/:username",
  adminProtection,
  adminGetProfilePost
);
router.get("/single-post/:id", getOnePost);
router.get("/admin-single-post/:id", adminProtection, adminGetOnePost);
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
router.delete("/admin-delete-post/:id", adminProtection, adminDeletePost);
router.delete(
  "/:postID/admin-delete-comment/:id",
  adminProtection,
  adminDeleteComment
);

module.exports = router;
