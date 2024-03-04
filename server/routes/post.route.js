const express = require("express");
const {
  addPost,
  addComment,
  likeUnlikePost,
  likeUnlikeComment,
} = require("../controllers/post.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");
const router = express.Router();

router.post("/add", protectedRoute, addPost);
router.post("/like-unlike/:id", protectedRoute, likeUnlikePost);
router.post("/add-comment/:id", protectedRoute, addComment);
router.post(
  "/:id/comment/like-unlike/:index",
  protectedRoute,
  likeUnlikeComment
);

module.exports = router;
