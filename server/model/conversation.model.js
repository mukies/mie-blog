const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
    lastMessage: {
      senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: { type: String, default: "" },
    },
  },
  { timestamps: true }
);
const conversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = conversationModel;
