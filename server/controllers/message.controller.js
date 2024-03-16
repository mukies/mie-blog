const conversationModel = require("../model/conversation.model");
const messageModel = require("../model/message.model");
const userModel = require("../model/user.model");

exports.sendMessage = async (req, res) => {
  const { username } = req.params;
  const senderID = req.user._id;
  const { text, image } = req.body;

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
      image,
    });

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
    await conversation.messages.push(message._id);

    await conversation.save();
    await message.save();

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

exports.getConversation = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversations = await conversationModel
      .find({ users: userId })
      .select("users lastMessage")
      .populate("users", "fullName username profilePic");

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
