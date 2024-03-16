const {
  sendMessage,
  getMessage,
  getConversation,
} = require("../controllers/message.controller");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = require("express").Router();

router.post("/send/:username", protectedRoute, sendMessage);
router.get("/get-message/:username", protectedRoute, getMessage);
router.get("/get-conversation", protectedRoute, getConversation);

module.exports = router;
