/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [msgID, setMsgID] = useState([]);
  const msgIdList = localStorage.getItem("_N");
  const { socket } = useSocket();
  useEffect(() => {
    if (msgIdList?.length) {
      setMsgID(msgIdList);
    }
  }, [msgIdList?.length, socket]);
  return (
    <ConversationContext.Provider
      value={{ msgID, setMsgID, conversation, setConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
