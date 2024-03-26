/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PeopleList({
  title,
  action,
  data,
  setUnfollowed,
  unfollowed,
}) {
  //   console.log("first", data);
  const navigate = useNavigate();

  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const followUnfollow = async (user) => {
    setUnfollowLoading(true);
    try {
      const { data } = await axios.put(
        `/api/user/follow-unfollow/${user.username}`
      );
      if (data.success) {
        if (unfollowed.includes(user._id)) {
          setUnfollowed(unfollowed.filter((i) => i !== user._id));
        } else {
          setUnfollowed((p) => [...p, user._id]);
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setUnfollowLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a8] z-[110] flex justify-center items-center">
      <div className=" h-full w-full md:h-[90%] relative md:w-[80%] lg:w-[50%] flex flex-col gap-1 p-3 rounded-lg bg-white">
        <span className="text-2xl font-semibold text-center capitalize">
          {title} {data.length > 0 && `(${data.length})`}
        </span>
        <span className="divider m-0 p-0"></span>
        {data.length ? (
          data.map((item, i) => (
            <div
              key={i}
              className="flex justify-between  gap-3 border-2 border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-300 duration-200"
            >
              <div className=" flex items-center gap-2 md:gap-5  ">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-400">
                  <img
                    className=" h-full w-full object-cover object-center "
                    src={item.profilePic}
                    alt={item.username}
                  />
                </div>
                <span className="text-xl font-semibold capitalize">
                  {item.fullName}
                </span>
              </div>

              <div className=" flex flex-col gap-2 justify-center  ">
                <button
                  onClick={() => {
                    navigate(`/profile/${item.username}`);
                    action((p) => !p);
                  }}
                  className={
                    title == "followings"
                      ? "btn btn-success btn-xs text-white "
                      : "btn btn-success btn-sm text-white "
                  }
                >
                  Visit Profile
                </button>
                {title == "followings" && (
                  <button
                    onClick={() => {
                      !unfollowLoading && followUnfollow(item);
                    }}
                    className={
                      unfollowed.includes(item._id)
                        ? "btn btn-info flex items-center gap-1 btn-xs text-white"
                        : "btn btn-error flex items-center gap-1 btn-xs text-white"
                    }
                  >
                    {!unfollowed.includes(item._id) && (
                      <HiMiniXMark size={18} />
                    )}
                    {unfollowed.includes(item._id) ? (
                      <span>Follow</span>
                    ) : (
                      <span>Unfollow</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center">
            {" "}
            <span className="text-2xl font-semibold">
              There is no-one in your {title} list.{" "}
            </span>
          </div>
        )}

        <div
          onClick={() => action((p) => !p)}
          className="btn btn-md btn-circle absolute top-0 right-0"
        >
          <span>
            <FaTimes />
          </span>
        </div>
      </div>
    </div>
  );
}
