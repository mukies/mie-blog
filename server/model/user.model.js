const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: { type: String, default: "../assets/img.jpg" },
    coverPic: { type: String, default: "../assets/img.jpg" },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    isFrozen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
