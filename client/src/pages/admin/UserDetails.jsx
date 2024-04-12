import UserProfile from "../../components/adminComponent/UserProfile";
import UserPost from "../../components/adminComponent/UserPost";
import { FaUserFriends } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FriendListPopup from "../../components/adminComponent/FriendListPopup";
import { toast } from "react-toastify";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetailLoading, setUserDetailLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [freezeLoading, setFreezeLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [followerListPopup, setFollowerListPopup] = useState(false);
  const [followingListPopup, setFollowingListPopup] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    getUserDetails();
    getProfilePost();
  }, [id]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`/api/admin/get-single-user/${id}`);
      if (data.success) {
        setUser(data.user);
        setIsFrozen(data.user.isFrozen);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUserDetailLoading(false);
    }
  };

  const getProfilePost = async () => {
    try {
      const { data } = await axios.get(`/api/post/admin-profile-post/${id}`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error("error while fetching feed post.");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleFreeze = async () => {
    if (!freezeLoading) {
      try {
        setFreezeLoading(true);
        const { data } = await axios.put(`/api/admin/freeze-account/${id}`);

        if (data.success) {
          toast.success(data.message);
          setIsFrozen(!isFrozen);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setFreezeLoading(false);
      }
    }
  };

  return (
    <div className="max-w-[768px] mx-auto">
      {userDetailLoading || postLoading ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-[97] bottom-0 bg-white flex justify-center items-center">
            <span className="loading loading-spinner scale-150 "></span>
          </div>
        </>
      ) : !userDetailLoading && !postLoading && user ? (
        <>
          <div className=" px-1 sm:px-3">
            <UserProfile user={user} />
            <span className="text-2xl font-semibold">User Details:</span>
            <div className="flex mt-2 flex-col gap-1">
              <p className="text-xl font-semibold">
                Email:{" "}
                <span className="font-normal text-gray-700">{user.email}</span>
              </p>
              <p className="text-xl font-semibold">
                Username:{" "}
                <span className="font-normal text-gray-700">
                  {user.username}
                </span>
              </p>
              <p className="text-xl font-semibold">
                Gender:{" "}
                <span className="font-normal text-gray-700">{user.gender}</span>
              </p>
              <button
                onClick={handleFreeze}
                className={
                  isFrozen
                    ? " btn btn-sm btn-success capitalize max-w-max text-white mt-2"
                    : " btn btn-sm btn-error capitalize max-w-max text-white mt-2"
                }
              >
                {freezeLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : isFrozen ? (
                  "enable account"
                ) : (
                  "disable account"
                )}
              </button>
            </div>
          </div>

          <div className="divider mx-auto"></div>
          <div className="bg-gray-300 max-w-max   mx-auto rounded-lg p-2 flex  gap-0 sm:gap-5 justify-around ">
            <p
              onClick={() => setFollowerListPopup(true)}
              className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
            >
              <FaUserFriends />{" "}
              <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                Followers
              </span>
            </p>
            <p
              onClick={() => setFollowingListPopup(true)}
              className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
            >
              <FaUserFriends />{" "}
              <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                Followings
              </span>
            </p>
          </div>

          {followerListPopup && (
            <FriendListPopup
              title={"followers"}
              data={user?.followers}
              action={setFollowerListPopup}
            />
          )}
          {followingListPopup && (
            <FriendListPopup
              title={"followings"}
              data={user?.followings}
              action={setFollowingListPopup}
            />
          )}

          <div className="divider mx-auto"></div>

          {/* posts  */}

          <div className="flex flex-col  gap-3">
            <div className="flex items-center justify-around gap-3">
              <span className="text-2xl font-semibold">Posts</span>
              <p
                onClick={() => navigate(`/admin/user/photos/${id}`)}
                className=" flex items-center gap-2 max-w-max p-3 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
              >
                <MdPermMedia />{" "}
                <span className="text-sm text-nowrap md:text-[17px] font-semibold">
                  All Photos
                </span>
              </p>
            </div>
            <div
              className={
                posts.length
                  ? "flex flex-col gap-3"
                  : "flex justify-center items-center h-[40dvh]"
              }
            >
              {posts.length ? (
                posts.map((post) => (
                  <UserPost key={post._id} post={post} setPosts={setPosts} />
                ))
              ) : (
                <span className="text-xl font-semibold">
                  User did&apos;t have any post.
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        "Something went wrong"
      )}
    </div>
  );
}
