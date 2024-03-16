import { useNavigate, useParams } from "react-router-dom";
// import Message from "../components/Message";
// import useGetMessage from "../hooks/useGetMessage";
// import { useMessage } from "../context/MessageContext";
import { useEffect, useState } from "react";
import useUserDetails from "../hooks/useUserDetails";
import useSendMessage from "../hooks/useSendMessage";
import MessageSection from "../components/MessageSection";

export default function MessagePage() {
  const [text, setText] = useState("");

  const { sendMessage, loading: sendLoading } = useSendMessage();

  const navigate = useNavigate();
  const { id } = useParams();

  const { getUserDetails, loading, user } = useUserDetails();

  useEffect(() => {
    // console.log("msg page", id);

    getUserDetails(id);
  }, [id]);

  // send message
  const handleMessage = async () => {
    if (text) {
      await sendMessage(id, text);
      setText("");
    }
  };

  return (
    <div className="max-w-[768px] h-[calc(100dvh-66px)]   mx-auto">
      <div className="bg-gray-300 relative rounded-t-lg h-[60px] px-2 flex  items-center text-black">
        <div className="absolute top-[25%] left-[10px]">
          <button
            onClick={() => navigate("/chats")}
            className="btn  btn-sm bg-[#316ff6] hover:bg-[#375492] duration-200 text-white"
          >
            back
          </button>
        </div>
        <div className=" flex  items-center gap-3 px-5 justify-center mx-auto w-[50%]">
          <span className="text-xl font-semibold">To:</span>
          <p className="text-2xl text-nowrap font-semibold">
            {loading ? (
              <span className="loading loading-bars"></span>
            ) : (
              <span
                onClick={() => navigate(`/profile/${id}`)}
                className=" cursor-pointer capitalize"
              >
                {user?.fullName}
              </span>
            )}
            {!loading && (
              <span className="text-lg text-[green] capitalize">(online)</span>
            )}
          </p>
        </div>
      </div>
      {/* message box */}
      <MessageSection user={user} />
      <div className=" px-5 rounded-b-lg h-[60px] gap-2 flex justify-center items-center">
        <label className="input input-success w-full h-full flex items-center gap-2">
          <input
            value={text}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleMessage();
              }
            }}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="grow"
            placeholder="Type a message..."
          />
        </label>
        <button
          onClick={handleMessage}
          disabled={loading || sendLoading}
          className="btn btn-success text-white"
        >
          {sendLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>send</span>
          )}
        </button>
      </div>
    </div>
  );
}
