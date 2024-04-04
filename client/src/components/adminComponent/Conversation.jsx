/* eslint-disable react/prop-types */
import { FaTrashCan } from "react-icons/fa6";
import { useSocket } from "../../context/SocketContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Conversation({ chat, setChats }) {
  const { onlineUsers } = useSocket();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
  const handleDelete = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const { data } = await axios.delete(
          `/api/message/admin-delete-conversation/${chat._id}`
        );
        if (data.success) {
          setChats((p) => p.filter((ch) => ch._id !== chat._id));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-between items-center py-2 px-3 rounded-lg border-2 border-gray-400">
      <div className="flex items-start  flex-col gap-3">
        <div className="flex  items-center gap-1">
          <div className="h-[40px] relative w-[40px] rounded-full ">
            <img
              className="object-cover h-full w-full rounded-full object-center"
              alt="user-profile"
              src={chat.users[0].profilePic}
            />
            {onlineUsers.includes(chat.users[0]._id) && (
              <div className="absolute h-[10px] w-[10px] rounded-full bg-green-600 border-[1px] border-white top-0 right-0"></div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-semibold capitalize ">
              {chat.users[0].fullName}
            </h1>
          </div>
        </div>
        {/* second */}
        <div className="flex  items-center gap-1">
          <div className="  h-[40px] relative w-[40px] rounded-full ">
            <img
              className="object-cover h-full w-full rounded-full object-center"
              alt="user-profile"
              src={chat.users[1]?.profilePic}
            />
            {onlineUsers.includes(chat.users[1]?._id) && (
              <div className="absolute h-[10px] w-[10px] rounded-full bg-green-600 border-[1px] border-white top-0 right-0"></div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold capitalize">
              {chat.users[1]?.fullName}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div onClick={() => navigate(`/admin/chats/${chat._id}`)}>
          <button className="btn btn-outline btn-sm text-xs sm:text-sm">
            View messages
          </button>
        </div>
        <div role="button" tabIndex={0} className="dropdown dropdown-end">
          <button className="btn btn-sm  hover:bg-red-900 bg-red-600 text-white">
            <FaTrashCan />
          </button>
          {/* dropdown  */}
          <div
            tabIndex={0}
            className="dropdown-content z-10 mt-5 text-black w-auto p-5 bg-white rounded-lg border-2 border-[#316ff6]"
          >
            <div className="flex flex-col items-center gap-5">
              <span>Are you sure ?</span>
              <div className="flex items-center gap-3">
                <div onClick={handleDelete}>
                  <button className="btn btn-sm btn-error">delete</button>
                </div>
                <div>
                  <button onClick={handleClick} className="btn btn-sm btn-info">
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
