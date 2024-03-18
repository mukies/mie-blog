import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMessage } from "../context/MessageContext";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { setMessages, messages } = useMessage();
  const { setMsg } = useMessage();

  const sendMessage = async (username, text, image) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/message/send/${username}`, {
        text,
        image,
      });
      if (data.success) {
        setMessages({
          ...messages,
          messages: [...messages.messages, data.message],
        });
        setMsg((p) => !p);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
}
