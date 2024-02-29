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
    likes: { type: Number, default: 0 },
    comments: [
      {
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
