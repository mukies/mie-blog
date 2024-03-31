const conversationModel = require("../model/conversation.model");
const messageModel = require("../model/message.model");
const userModel = require("../model/user.model");
const { v2: cloudinary } = require("cloudinary");
const { io, getReceiverSocketID } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
  const { username } = req.params;
  const senderID = req.user._id;
  const { text } = req.body;
  let { image } = req.body;

  if (!text && !image) {
    return res.json({
      success: false,
      message: "No message content to send.",
    });
  }
  try {
    const otherUser = await userModel.findOne({ username });
    if (!otherUser) {
      return res.json({
        success: false,
        message: "user not found to send message.",
      });
    }
    // check conversation already exist
    let conversation = await conversationModel.findOne({
      users: { $all: [otherUser._id, senderID] },
    });
    if (!conversation) {
      // if not create one
      conversation = new conversationModel({
        users: [senderID, otherUser._id],
        lastMessage: {
          senderID,
          text:
            text && image
              ? text
              : !text && image
              ? "Send an image."
              : text && !image
              ? text
              : "",
        },
      });
    }
    const message = new messageModel({
      receiverID: otherUser._id,
      senderID,
      text,
    });

    if (image) {
      const response = await cloudinary.uploader.upload(image);
      image = response.secure_url;
      message.image = image;
    }
    // to create latest message
    await conversation.updateOne({
      lastMessage: {
        senderID,
        text:
          text && image
            ? text
            : !text && image
            ? "Send an image."
            : text && !image
            ? text
            : "",
      },
    });
    conversation.messages.push(message._id);

    await conversation.save();
    await message.save();

    const receiverSocketID = getReceiverSocketID(otherUser._id);

    if (receiverSocketID) {
      io.to(receiverSocketID).emit("newMessage", message);
    }

    res.json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on send message controller.",
    });
  }
};

exports.getMessage = async (req, res) => {
  const { username } = req.params;
  const userID = req.user._id;
  try {
    const otherUser = await userModel.findOne({ username });
    if (!otherUser) {
      return res.json({
        success: false,
        message: "friends did not found to chat.",
      });
    }
    const conversation = await conversationModel
      .findOne({ users: { $all: [otherUser._id, userID] } })
      .populate("messages")
      .populate("users", "fullName profilePic username");

    if (!conversation)
      return res.json({
        success: false,
        message: "conversation didn't found.",
      });

    conversation.users = conversation.users.filter(
      (i) => i._id.toString() !== userID.toString()
    );

    res.json({ success: true, conversation });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while getting message.",
    });
  }
};

exports.adminGetMessage = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await conversationModel
      .findOne({ _id: conversationId })
      .populate("messages")
      .populate("users", "fullName profilePic username");

    if (!conversation)
      return res.json({
        success: false,
        message: "conversation didn't found.",
      });

    res.json({ success: true, conversation });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while getting message.",
    });
  }
};

exports.adminGetConversation = async (req, res) => {
  try {
    const conversations = await conversationModel
      .find()
      .select("users")
      .populate("users", "fullName username profilePic")
      .sort({ updatedAt: -1 });

    if (!conversations)
      return res.json({
        success: false,
        message: "conversation did not found.",
      });
    console.log(conversations, "conversations");

    res.json({ success: true, conversations });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while fetching conversation list.",
    });
  }
};

exports.getConversation = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversations = await conversationModel
      .find({ users: userId })
      .select("users lastMessage")
      .populate("users", "fullName username profilePic")
      .sort({ updatedAt: -1 });

    if (!conversations)
      return res.json({
        success: false,
        message: "conversation did not found.",
      });

    conversations.map((item) => {
      item.users = item.users.filter(
        (i) => i._id.toString() !== userId.toString()
      );
    });

    res.json({ success: true, conversations });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while fetching conversation list.",
    });
  }
};

exports.seenMessage = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await conversationModel.findById(conversationId);
    if (!conversation)
      return res.json({ success: false, message: "Conversation not found." });
    if (
      conversation.lastMessage.senderID.toString() !== req.user._id.toString()
    ) {
      conversation.lastMessage.seen = true;
      conversation.save();

      res.json({
        success: true,
        message: "Message seen successfully.",
        conversation,
      });
    } else {
      res.json({
        success: false,
        message: "You can't seen your own message.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while message seen.",
    });
  }
};

exports.deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await conversationModel.findByIdAndDelete(
      conversationId
    );
    if (!conversation)
      return res.json({
        success: false,
        message: "Could not find conversation",
      });

    res.json({
      success: true,
      message: "conversation delete successfully.",
      conversation,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error while message seen.",
    });
  }
};
