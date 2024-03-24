import { useEffect, useState } from "react";
import useSuggestion from "../hooks/useSuggestion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiUserFollowFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";

export default function UserSuggestionPage() {
  const navigate = useNavigate();

  const [followed, setFollowed] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { suggestion, getSuggestedUser, loading } = useSuggestion();

  useEffect(() => {
    getSuggestedUser();
  }, []);

  const followUnfollow = async (user) => {
    setFollowLoading(true);
    try {
      const { data } = await axios.put(
        `/api/user/follow-unfollow/${user.username}`
      );
      if (data.success) {
        if (followed.includes(user._id)) {
          setFollowed(followed.filter((i) => i !== user._id));
        } else {
          setFollowed((p) => [...p, user._id]);
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="max-w-[768px]  py-5  mx-auto flex flex-col">
      <span className="text-2xl font-semibold mx-auto capitalize">
        People you may know.
      </span>
      <span className=" divider divider-success "></span>
      <div
        className={
          loading
            ? "flex justify-center items-center h-[50dvh] "
            : "grid grid-cols-1 sm:grid-cols-2 px-5 md:grid-cols-3  gap-5 mx-auto md:mx-0  "
        }
      >
        {/* first person  */}
        {!loading && suggestion.length ? (
          suggestion?.map((user, i) => {
            if (i > 8) {
              return "";
            }
            return (
              <div
                key={user._id}
                className=" min-w-[300px] sm:min-w-[150px] rounded-xl overflow-hidden flex flex-col border-[1px] border-gray-400"
              >
                {/* top  */}
                <div
                  onClick={() => navigate(`/profile/${user?.username}`)}
                  className=" bg-[#316ff6] h-[250px] sm:h-[200px] cursor-pointer w-full  overflow-hidden"
                >
                  <img
                    className="h-full md:hover:scale-105 md:duration-200 w-full object-cover object-center"
                    src={user.profilePic}
                    alt="user-photo"
                  />
                </div>
                {/* bottom  */}
                <div className="flex p-2 gap-4 flex-col">
                  <div className="flex justify-center">
                    <span
                      onClick={() => navigate(`/profile/${user?.username}`)}
                      className="capitalize cursor-pointer text-lg font-semibold text-center"
                    >
                      {user.fullName}
                    </span>
                  </div>
                  <div className=" flex flex-col">
                    <button
                      onClick={async () => {
                        if (!followLoading) {
                          await followUnfollow(user);
                        }
                      }}
                      className={
                        followed.includes(user?._id)
                          ? "btn btn-active capitalize font-semibold  "
                          : "btn btn-success capitalize bg-[#316ff6] flex items-center border-[#316ff6] text-white "
                      }
                    >
                      {followed?.includes(user?._id) ? (
                        <RiUserFollowFill />
                      ) : (
                        <IoPersonAdd />
                      )}
                      {user.followings?.includes(auth?._id) &&
                      !followed.includes(user._id)
                        ? "Follow Back"
                        : !user.followings?.includes(auth?._id) &&
                          !followed.includes(user._id)
                        ? "Follow"
                        : followed.includes(user._id)
                        ? "following"
                        : ""}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : loading ? (
          <span className="loading loading-spinner scale-150"></span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
