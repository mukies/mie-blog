const {
  sendMessage,
  getMessage,
  getConversation,
  seenMessage,
  adminGetConversation,
  deleteConversation,
  adminGetMessage,
} = require("../controllers/message.controller");
const { adminProtection } = require("../middlewares/adminProtection");
const { protectedRoute } = require("../middlewares/protectedRoute");

const router = require("express").Router();

router.post("/send/:username", protectedRoute, sendMessage);
router.get("/get-message/:username", protectedRoute, getMessage);
router.get(
  "/admin-get-message/:conversationId",
  adminProtection,
  adminGetMessage
);
router.get("/get-conversation", protectedRoute, getConversation);
router.get("/admin-get-conversation", adminProtection, adminGetConversation);
router.put("/seen-message/:conversationId", protectedRoute, seenMessage);
router.delete(
  "/admin-delete-conversation/:conversationId",
  adminProtection,
  deleteConversation
);

module.exports = router;
