import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useConversation } from "../context/ConversationContext";

export function useGetConversations() {
  const [loading, setLoading] = useState(true);
  const { conversation, setConversation } = useConversation();

  const getConversation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/message/get-conversation");
      if (data.success) {
        setConversation(data.conversations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { conversation, setConversation, loading, getConversation };
}
