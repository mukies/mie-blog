const express = require("express");
const { addPost } = require("../controllers/post.controller");
const router = express.Router();

router.post("/add", addPost);

module.exports = router;
