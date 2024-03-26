const {
  sendMessage,
  getMessage,
  getConversation,
  seenMessage,
} = require("../controllers/message.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = require("express").Router();

router.post("/send/:username", protectedRoute, sendMessage);
router.get("/get-message/:username", protectedRoute, getMessage);
router.get("/get-conversation", protectedRoute, getConversation);
router.put("/seen-message/:conversationId", protectedRoute, seenMessage);

module.exports = router;
