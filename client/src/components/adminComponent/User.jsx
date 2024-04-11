/* eslint-disable react/prop-types */
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaLock, FaLockOpen } from "react-icons/fa";

export default function User({ user, setUsers }) {
  const navigate = useNavigate();
  const { onlineUsers } = useSocket();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const deleteUser = async (id) => {
    if (!loading) {
      setLoading(true);
      try {
        const { data } = await axios.delete(`/api/admin/delete-user/${id}`);
        if (data.success) {
          setUsers((p) => p.filter((usr) => usr._id !== id));
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
    <div className="flex justify-between items-center p-2 relative rounded-lg border-2 border-gray-400">
      <div className="flex items-center gap-3">
        <div className=" h-[50px] w-[50px] sm:h-[80px] relative sm:w-[80px] rounded-full ">
          <img
            onClick={() => navigate(`/admin/users/${user.username}`)}
            className="object-cover h-full w-full rounded-full object-center cursor-pointer"
            alt="user-profile"
            src={user.profilePic}
          />
          {onlineUsers.includes(user._id) ? (
            <div className="absolute h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] rounded-full bg-green-600 border-[2px] sm:border-[3px] border-white top-0 right-0"></div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <h1
            onClick={() => navigate(`/admin/users/${user.username}`)}
            className="sm:text-xl text-sm whitespace-nowrap font-semibold cursor-pointer "
          >
            {user.fullName}
          </h1>
          <span className=" text-sm sm:text-lg text-gray-600">
            {user.createdAt.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <button
            onClick={() => navigate(`/admin/users/${user.username}`)}
            className="btn btn-outline btn-sm text-black"
          >
            details
          </button>
        </div>
        <div role="button" tabIndex={0} className="dropdown dropdown-end">
          <button className="btn btn-sm border-none hover:bg-red-900 bg-red-600 text-white">
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
                <div>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    delete
                  </button>
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
      <div className=" absolute flex justify-center items-center top-0 right-[5px] ">
        {user.isFrozen ? (
          <FaLock title="disabled" color="red" />
        ) : (
          <FaLockOpen title="active" color="green" />
        )}
      </div>
    </div>
  );
}
