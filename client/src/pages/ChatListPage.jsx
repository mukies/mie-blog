import { useNavigate } from "react-router-dom";
import { useGetConversations } from "../hooks/useGetConversations";
import { useEffect } from "react";

export default function ChatListPage() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("_L"));

  const { conversation, loading, getConversation } = useGetConversations();
  useEffect(() => {
    getConversation();
  }, []);

  return (
    <div className="max-w-[768px] py-5  mx-auto">
      <div className="bg-[#316ff6] rounded-lg h-[60px] relative flex justify-center items-center text-white ">
        <span className="text-2xl font-semibold">Conversations</span>
        <button
          onClick={() => navigate("/")}
          className="absolute top-[25%] left-[5px] btn btn-warning btn-sm"
        >
          back
        </button>
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
              onClick={() => navigate(`/chats/${i.users[0].username}`)}
              key={id}
              className="flex gap-5 cursor-pointer hover:bg-gray-300 border-[1px] rounded-sm border-gray-300 p-2  items-center"
            >
              <div className=" relative flex justify-center items-center rounded-full border-[2px] border-white">
                <img
                  className="h-14 w-14 rounded-full"
                  src={i.users[0].profilePic}
                  alt="user-profile"
                />
                <div className="absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full bg-[green]"></div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl capitalize">
                  {i.users[0].fullName}
                </span>

                <span className="capitalize text-gray-500 text-sm">
                  {i.lastMessage.senderID == auth?._id ? "You: " : ""}
                  {i.lastMessage.text.substring(0, 20)}
                  {i.lastMessage.text.length > 19 && "..."}
                </span>
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
