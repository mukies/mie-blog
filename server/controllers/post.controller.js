const postModel = require("../model/post.model");

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
