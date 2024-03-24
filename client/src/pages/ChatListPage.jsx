import { useNavigate } from "react-router-dom";
import { useGetConversations } from "../hooks/useGetConversations";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useConversation } from "../context/ConversationContext";
import "../App.css";
import useFollowers from "../hooks/useFollowers";

export default function ChatListPage() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState("");
  const { conversation, loading, getConversation } = useGetConversations();
  const { followers, getFollowers } = useFollowers();
  const { onlineUsers, socket } = useSocket();
  const { msgID, setMsgID } = useConversation();
  const msgIdList = JSON.parse(localStorage.getItem("_N"));

  useEffect(() => {
    getConversation();

    socket?.on("newMessage", (message) => {
      if (!msgIdList?.includes(message.senderID)) {
        setMsgID((p) => [...p, message.senderID]);
        let data;
        if (msgID.length) {
          data = [...msgIdList, message.senderID];
        } else {
          data = [message.senderID];
        }
        localStorage.setItem("_N", JSON.stringify(data));
      }
    });

    socket?.on("isTyping", (isTyping) => {
      setIsTyping(isTyping.typing);
      setUserId(isTyping.id);
    });

    getFollowers(auth?.username);
    return () => {
      socket?.off("newMessage");
      socket?.off("isTyping");
    };
  }, [socket]);

  return (
    <div className="max-w-[768px]  py-5  mx-auto">
      <div className="bg-[#316ff6] rounded-lg h-[60px] relative flex justify-center items-center text-white ">
        <span className="text-2xl font-semibold">Conversations</span>
        <button
          onClick={() => navigate("/")}
          className="absolute top-[25%] left-[5px] btn btn-warning btn-sm"
        >
          back
        </button>
      </div>
      {/* user followers list  */}
      <div className="followers p-3 overflow-auto">
        <div className=" flex gap-5 items-center ">
          {/* first person  */}
          {followers.length
            ? followers.map((item) => (
                <div
                  onClick={() => navigate(`/chats/${item.username}`)}
                  key={item._id}
                  className="flex flex-col justify-center items-center cursor-pointer"
                >
                  <div className=" relative  bg-[#316ff6] rounded-full  flex justify-center items-center">
                    <img
                      src={item.profilePic}
                      className="w-[80px] h-[80px] rounded-full object-cover object-center"
                      alt="user"
                    />
                    {onlineUsers.includes(item._id) && (
                      <div className="absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full bg-[green]"></div>
                    )}
                  </div>
                  <span className="text-[17px] capitalize text-nowrap">
                    {item.fullName.length > 5
                      ? `${item.fullName.substring(0, 5)}...`
                      : item.fullName}
                  </span>
                </div>
              ))
            : ""}
        </div>
      </div>

      <div
        className={
          loading
            ? " flex h-[50dvh] justify-center items-center gap-1 px-1 py-3"
            : " flex flex-col gap-1 px-1 py-3"
        }
      >
        {/* first conversation */}
        {loading ? (
          <span className="loading loading-spinner scale-150"></span>
        ) : !loading && conversation.length ? (
          conversation.map((i, id) => (
            <div
              onClick={() => {
                navigate(`/chats/${i.users[0].username}`);
                if (msgIdList?.includes(i.users[0]._id)) {
                  const filteredList = msgIdList.filter(
                    (itm) => itm.length == 24
                  );
                  const ids = filteredList.filter(
                    (itm) => itm !== i.users[0]._id
                  );

                  localStorage.removeItem("_N");
                  localStorage.setItem("_N", JSON.stringify(ids));
                }
              }}
              key={id}
              className="flex gap-5 cursor-pointer hover:bg-gray-300 border-[1px] rounded-sm border-gray-300 p-2  items-center"
            >
              <div className=" relative flex justify-center items-center rounded-full border-[2px] border-white">
                <img
                  className="h-14 object-cover object-center w-14 rounded-full"
                  src={i.users[0].profilePic}
                  alt="user-profile"
                />
                {onlineUsers.includes(i.users[0]._id) && (
                  <div className="absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full bg-[green]"></div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl capitalize">
                  {i.users[0].fullName}
                </span>
                {isTyping && i.users[0]?._id == userId ? (
                  <span className="loading loading-dots">Typing</span>
                ) : msgID?.includes(i.users[0]._id) ? (
                  <span className="text-lg font-bold">New message</span>
                ) : (
                  <span className="capitalize text-gray-500 text-sm">
                    {i.lastMessage.senderID == auth?._id ? "You: " : ""}
                    {i.lastMessage.text.substring(0, 20)}
                    {i.lastMessage.text.length > 19 && "..."}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <span className="text-xl font-semibold">No conversation</span>
        )}
      </div>
    </div>
  );
}
