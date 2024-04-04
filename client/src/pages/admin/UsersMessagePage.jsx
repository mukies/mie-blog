import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSocket } from "../../context/SocketContext";
import ImageViewerPopup from "../../components/popup/ImageViewerPopup";
import { timeAgo } from "../../helper/dateFormater";

export default function UserMessagePage() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { onlineUsers } = useSocket();
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewImg, setViewImg] = useState(false);
  const messageRef = useRef();
  useEffect(() => {
    getMessage();
  }, [id]);

  setTimeout(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 10);

  const getMessage = async () => {
    try {
      const { data } = await axios.get(`/api/message/admin-get-message/${id}`);
      if (data.success) {
        setMessages(data.conversation.messages);
        setUsers(data.conversation.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[768px] h-[calc(100dvh-66px)]   mx-auto">
      {loading ? (
        <div className="fixed top-0 left-0 right-0 z-[97] bottom-0 bg-white flex justify-center items-center">
          <span className="loading loading-spinner scale-150 "></span>
        </div>
      ) : (
        <div>
          {" "}
          <div className="bg-gray-300 relative rounded-t-lg h-[60px] px-2 flex  items-center text-black">
            <div className="absolute top-[25%] left-[10px]">
              <button
                onClick={() => navigate("/admin/chats")}
                className="btn btn-sm btn-outline btn-active text-white"
              >
                back
              </button>
            </div>
            <div className=" flex  items-center gap-3 px-5 justify-center mx-auto w-[50%]">
              <div className=" flex flex-col sm:flex-row gap-1 sm:gap-2">
                <div className="flex gap-2 items-center">
                  <div className="h-[25px] w-[25px] relative  ">
                    <img
                      className="h-full w-full rounded-full object-cover object-center "
                      src={users[1]?.profilePic}
                      alt="user-image"
                    />
                    {onlineUsers.includes(users[1]._id) && (
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[green] border-[1px] border-white"></span>
                    )}
                  </div>
                  <span
                    onClick={() =>
                      navigate(`/admin/users/${users[1].username}`)
                    }
                    className=" cursor-pointer capitalize"
                  >
                    {users[1]?.fullName}
                  </span>
                </div>
                <span>&bull;</span>

                {/* person 2  */}
                <div className="flex gap-2 items-center">
                  <div className="h-[25px] w-[25px] relative  ">
                    <img
                      className="h-full w-full rounded-full object-cover object-center "
                      src={users[0]?.profilePic}
                      alt="user-image"
                    />
                    {onlineUsers.includes(users[0]._id) && (
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[green] border-[1px] border-white"></span>
                    )}
                  </div>
                  <span
                    onClick={() =>
                      navigate(`/admin/users/${users[0].username}`)
                    }
                    className=" cursor-pointer capitalize"
                  >
                    {users[0]?.fullName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* message box */}
          <div
            className={
              loading
                ? "border-l-2 border-b-2 rounded-b-md border-r-2 border-gray-300 flex justify-center items-center h-[calc(100%-120px)] p-3 overflow-auto "
                : "border-l-2 border-b-2 rounded-b-md border-r-2 relative border-gray-300 flex flex-col gap-5 h-[calc(100dvh-60px-65px)] p-3 overflow-y-scroll "
            }
          >
            {messages.map((msg) => (
              <div
                ref={messageRef}
                key={msg._id}
                className={
                  msg.senderID == users[0]._id
                    ? "flex flex-row-reverse gap-5"
                    : "flex  gap-5"
                }
              >
                <div className="flex items-center flex-col gap-0">
                  <div className="h-10 w-10 flex justify-center items-center rounded-full overflow-hidden">
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <img
                        className=" h-full w-full object-center object-cover"
                        src={
                          msg.senderID == users[0]._id
                            ? users[0].profilePic
                            : users[1].profilePic
                        }
                        alt="profile-pic"
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-center text-nowrap">
                    {timeAgo(new Date(msg.createdAt))}
                  </span>
                </div>

                <div className="flex flex-col gap-3 max-w-[40%] ">
                  {msg.text && (
                    <div
                      className={
                        msg.senderID == users[0]._id
                          ? "p-2 text-white rounded-lg rounded-br-none bg-blue-700"
                          : "p-2 text-white rounded-lg rounded-tl-none bg-gray-700 "
                      }
                    >
                      <p className="max-w-max  text-[17px] leading-[23px]">
                        {msg.text}
                      </p>
                    </div>
                  )}
                  {msg.image && (
                    <>
                      <div
                        onClick={() => setViewImg(true)}
                        className="h-[60dvh] cursor-pointer rounded-md overflow-hidden w-full "
                      >
                        <img
                          className=" h-full w-full object-center object-cover"
                          src={msg.image}
                          alt="image-content"
                        />
                      </div>
                      {viewImg && (
                        <ImageViewerPopup action={setViewImg} img={msg.image} />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
