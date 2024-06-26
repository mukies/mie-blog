import { useNavigate, useParams } from "react-router-dom";
// import Message from "../components/Message";
// import useGetMessage from "../hooks/useGetMessage";
// import { useMessage } from "../context/MessageContext";
import { useEffect, useState } from "react";
import useUserDetails from "../hooks/useUserDetails";
import useSendMessage from "../hooks/useSendMessage";
import MessageSection from "../components/MessageSection";
import { IoMdImages } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import usePreviewImg from "../hooks/usePreviewImg";
import { useMessage } from "../context/MessageContext";
import { useSocket } from "../context/SocketContext";

export default function MessagePage() {
  const [text, setText] = useState("");
  const { onlineUsers, socket } = useSocket();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { sendMessage, loading: sendLoading } = useSendMessage();

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    messages,
    loading: msgLoading,
    getMessage,
    setMessages,
    conversationUser,
  } = useMessage();
  const { getUserDetails, loading, user } = useUserDetails();
  const { previewImg, imgUrl, setImgUrl } = usePreviewImg();
  useEffect(() => {
    // console.log("msg page", id);

    getUserDetails(id);
    getMessage(id);
  }, [id]);
  if (text !== "") {
    socket?.emit("isTyping", {
      id: user?._id,
      senderID: auth?._id,
      typing: true,
    });
  } else {
    socket?.emit("isTyping", {
      id: user?._id,
      senderID: auth?._id,
      typing: false,
    });
  }
  // send message
  const handleMessage = async () => {
    if (!sendLoading) {
      if (text || imgUrl) {
        await sendMessage(id, text, imgUrl);
        setText("");
        setImgUrl(null);
      }
    }
  };

  return (
    <div className="max-w-[768px] min-h-[100dvh] sm:min-h-[calc(100vh-60px)]   mx-auto">
      <div className="bg-gray-300 sticky top-0 sm:top-[64px] z-10  rounded-t-lg h-[60px] px-2 flex  items-center text-black">
        {/* <div className="flex items-center "></div> */}
        <div className="absolute top-[25%] left-[10px]">
          <button
            onClick={() => navigate("/chats")}
            className="btn btn-sm btn-outline btn-active text-white"
          >
            back
          </button>
        </div>
        <div className=" flex  items-center gap-3 px-5 justify-center whitespace-nowrap mx-auto w-[50%]">
          <span className="sm:text-xl text-lg font-semibold">To:</span>
          <div className="text-2xl flex justify-center items-center font-semibold">
            {loading ? (
              <div className="fixed top-0 left-0 right-0 z-[97] bottom-0 bg-white flex justify-center items-center">
                <span className="loading loading-spinner scale-150 "></span>
              </div>
            ) : (
              <span
                onClick={() => navigate(`/profile/${id}`)}
                className=" cursor-pointer text-lg sm:text-2xl whitespace-nowrap  capitalize"
              >
                {user?.fullName}
              </span>
            )}{" "}
            {!loading && onlineUsers.includes(user?._id) && (
              <span className="text-lg text-[green] capitalize">(online)</span>
            )}
          </div>
        </div>
      </div>
      {/* message box */}

      {user._id && (
        <MessageSection
          user={user}
          messages={messages}
          loading={loading}
          msgLoading={msgLoading}
          setMessages={setMessages}
          conversationUser={conversationUser}
        />
      )}

      <div className="sticky bottom-0 px-1 sm:px-5 rounded-b-lg h-[60px] justify-between sm:gap-1 flex bg-white  sm:justify-center items-center">
        <span className="  sm:w-[40px] w-auto  h-auto ">
          <label htmlFor="file" className="cursor-pointer">
            <IoMdImages size={35} />
            <input
              onChange={previewImg}
              type="file"
              accept="image/*"
              className="hidden"
              id="file"
            />
          </label>
        </span>
        <label className="input input-success bg-gray-100 w-[65%] sm:w-full  flex items-center gap-1 sm:gap-2">
          <input
            value={text}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleMessage();
              }
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            className="grow"
            placeholder="Type a message..."
          />
        </label>

        <button
          onClick={handleMessage}
          disabled={loading || sendLoading}
          className="btn btn-success flex items-center justify-center  text-white"
        >
          {sendLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>
              <BsFillSendFill size={20} />
            </span>
          )}
        </button>
      </div>
      {imgUrl && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center z-[222] items-center bg-[#000000b0]">
          <div className="relative gap-2  w-full h-[80%] md:w-[40%] flex flex-col rounded-lg">
            <div
              onClick={() => setImgUrl(null)}
              className="absolute top-0 right-0 btn btn-md btn-circle bg-gray-200 border-none text-[red]"
            >
              <span>
                <FaTimes />
              </span>
            </div>
            <div className="h-[calc(100%-50px)] bg-black rounded-xl overflow-hidden w-full">
              <img
                className="object-contain h-full w-full object-center"
                src={imgUrl}
                alt="image-content"
              />
            </div>
            <div className=" flex px-4 justify-center items-center h-[50px] ">
              <button
                onClick={handleMessage}
                className="btn btn-success text-white w-full "
              >
                {sendLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "send"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
