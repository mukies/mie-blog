/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
// import useGetMessage from "../hooks/useGetMessage";
import useUserDetails from "../hooks/useUserDetails";
import Message from "./Message";
import { useSocket } from "../context/SocketContext";

export default function MessageSection({
  user,
  messages,
  msgLoading: loading,
  setMessages,
  conversationUser,
}) {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const msgRef = useRef();
  const { socket } = useSocket();
  // for typing effect (message receiiver user's id)
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState("");
  const {
    getUserDetails,
    loading: userLoading,
    user: loginUser,
  } = useUserDetails();

  setTimeout(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 10);

  // ---

  // ---

  useEffect(() => {
    getUserDetails(auth?.username);
    socket?.on("newMessage", (message) => {
      if (message.senderID == user?._id) {
        setMessages((p) => [...p, message]);
      }
    });
    socket?.on("isTyping", (isTyping) => {
      setIsTyping(isTyping.typing);
      setUserId(isTyping.id);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("isTyping");
    };
  }, [auth?.username, socket]);

  return (
    <div
      className={
        loading || userLoading || !messages?.length
          ? "border-l-2 border-b-2 rounded-b-md border-r-2 border-gray-300 flex justify-center items-center h-[calc(100%-120px)] p-3 overflow-auto "
          : "border-l-2 border-b-2 rounded-b-md border-r-2 relative border-gray-300 flex flex-col gap-5 h-[calc(100%-120px)] p-3 overflow-auto "
      }
    >
      {loading || userLoading ? (
        <span className="loading loading-spinner scale-125"></span>
      ) : !loading &&
        !userLoading &&
        messages?.length > 0 &&
        user &&
        loginUser ? (
        messages.map((item, i) => (
          <div ref={msgRef} key={i}>
            <Message
              userLoading={userLoading}
              msg={item}
              loginUser={loginUser}
              otherUser={user}
            />
          </div>
        ))
      ) : (
        <span className="text-2xl font-semibold">
          Say hi to start conversation.
        </span>
      )}
      {/* for typing animation  */}
      {isTyping && conversationUser[0]?._id == userId && (
        <div className="sticky bottom-0 left-0 bg-gray-300  max-w-max  flex  gap-3 items-center p-2 rounded-2xl">
          <span className="font-semibold">Typing</span>{" "}
          <span className="loading loading-dots">Typing</span>
        </div>
      )}
    </div>
  );
}
