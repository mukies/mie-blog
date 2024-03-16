/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState({
    messages: [],
  });
  const [msg, setMsg] = useState(false);

  const [loading, setLoading] = useState(false);
  const getMessage = async (username) => {
    try {
      const { data } = await axios.get(`/api/message/get-message/${username}`);
      if (data.success) {
        setMessages(data.conversation);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, getMessage, loading, msg, setMsg }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);