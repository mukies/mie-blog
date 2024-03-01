const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    textContent: { type: String },
    mediaContent: { type: String },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    comments: [
      {
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        likes: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: "User",
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
