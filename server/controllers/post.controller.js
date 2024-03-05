const postModel = require("../model/post.model");
const userModel = require("../model/user.model");

// post

exports.addPost = async (req, res) => {
  const { text, image } = req.body;

  try {
    if (!text && !image) {
      res.json({
        success: false,
        message: "You don't have any content to post.",
      });
    } else {
      const post = new postModel({ postedBy: req.user._id, text, image });
      await post.save();
      res.json({
        success: true,
        message: "A new post was posted to your timeline.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: true,
      message: "try catch error on add post controller",
    });
  }
};

exports.addComment = async (req, res) => {
  const { id: postID } = req.params;
  const content = req.body.text;

  try {
    if (!content) {
      res.json({
        success: false,
        message: "You don't have any content to comment.",
      });
    } else {
      // find the post
      const post = await postModel.findById(postID);
      if (!post) {
        res.json({
          success: false,
          message: "Post not found.",
        });
      } else {
        // make the object to push into the comment arrey
        const comment = {
          commentedBy: req.user._id,
          content,
        };

        // push into the comment arrey
        post.comments.push(comment);
        await post.save();

        res.json({
          success: true,
          message: "Your comment was posted.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on add comment controller.",
    });
  }
};

// update

exports.likeUnlikePost = async (req, res) => {
  const { id: postID } = req.params;
  const post = await postModel.findById(postID);
  try {
    // check if already liked or not
    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      // unlike
      await postModel.findByIdAndUpdate(postID, {
        $pull: { likes: req.user._id },
      });

      res.json({
        success: true,
        message: "post unliked successfully.",
      });
    } else {
      // like
      await postModel.findByIdAndUpdate(postID, {
        $push: { likes: req.user._id },
      });

      res.json({
        success: true,
        message: "post liked successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on like unlike controller.",
    });
  }
};

exports.likeUnlikeComment = async (req, res) => {
  const { index, id } = req.params;
  const post = await postModel.findById(id);

  try {
    // check index of comment is valid

    if (index < post.comments.length) {
      //  check if comment already liked or not
      const isLiked = post.comments[index].likes.includes(req.user._id);

      if (isLiked) {
        // unlike
        const otherUsers = post.comments[index].likes.filter(
          (i) => i.toString() !== req.user._id.toString()
        );
        post.comments[index].likes = otherUsers;
        await post.save();
        res.json({
          success: true,
          message: "remove like from comment",
        });
      } else {
        // like
        post.comments[index].likes.push(req.user._id);
        await post.save();
        res.json({
          success: true,
          message: "added like into comment",
        });
      }
    } else {
      res.json({
        success: false,
        message: "unable to like comment.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on like unlike comment controller.",
    });
  }
};

// get (for admin)
exports.getAllPost = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "fullName username profilePic")
      .populate("comments.commentedBy", "fullName username profilePic")
      .populate("likes", "fullName username profilePic");

    res.json({
      success: true,
      message: "post found successfully.",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on getting all post.",
    });
  }
};

exports.getOnePost = async (req, res) => {
  const { id: postID } = req.params;
  try {
    const post = await postModel
      .findById(postID)
      .populate("postedBy", "fullName username profilePic")
      .populate("comments.commentedBy", "fullName username profilePic")
      .populate("likes", "fullName username profilePic");

    res.json({
      success: true,
      message: "post found.",
      post,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on getting one post.",
    });
  }
};

exports.getFeedPost = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  try {
    const feedPost = await postModel
      .find({
        postedBy: { $in: user.followings },
      })
      .populate("postedBy", "fullName username profilePic");
    res.json({
      success: true,
      message: "feed post found.",
      feedPost,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while getting feed posts.",
    });
  }
};

// delete

exports.userDeletePost = async (req, res) => {
  const { id: postID } = req.params;
  try {
    const post = await postModel.findById(postID);
    if (!post)
      return res.json({ success: false, message: "post did not found." });

    if (post.postedBy.toString() == req.user._id.toString()) {
      await postModel.findByIdAndDelete(postID);
      res.json({
        success: true,
        message: "Post deleted successfully.",
      });
    } else {
      res.json({
        success: false,
        message: "you can't delete other people's posts.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while deleting a post by user",
    });
  }
};

exports.adminDeletePost = async (req, res) => {
  const { id: postID } = req.params;
  try {
    const post = await postModel.findById(postID);
    if (!post)
      return res.json({ success: false, message: "post did not found." });

    await postModel.findByIdAndDelete(postID);

    res.json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while deleting a post by admin",
    });
  }
};

exports.userDeleteComment = async (req, res) => {
  const { postID, id } = req.params;
  try {
    const post = await postModel.findById(postID);
    if (!post)
      return res.json({ success: false, message: "post is not found." });

    const commentIndex = post.comments.findIndex((i) => i._id.toString() == id);

    if (commentIndex >= 0) {
      if (
        post.comments[commentIndex].commentedBy.toString() ==
        req.user._id.toString()
      ) {
        res.json({ success: true, message: "comment deleted successfully" });
        post.comments.splice(commentIndex, 1);
        await post.save();
      } else {
        res.json({
          success: false,
          message: "You can't delete other's people comments.",
        });
      }
    } else {
      res.json({
        success: false,
        message: "comment didn't found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on comment deletation from user.",
    });
  }
};
exports.adminDeleteComment = async (req, res) => {
  const { postID, id } = req.params;
  try {
    const post = await postModel.findById(postID);
    if (!post)
      return res.json({ success: false, message: "post is not found." });

    const commentIndex = post.comments.findIndex((i) => i._id.toString() == id);

    if (commentIndex >= 0) {
      res.json({ success: true, message: "comment deleted successfully" });
      post.comments.splice(commentIndex, 1);
      await post.save();
    } else {
      res.json({
        success: false,
        message: "comment didn't found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on comment deletation from admin.",
    });
  }
};
