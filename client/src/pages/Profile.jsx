/* eslint-disable react-hooks/exhaustive-deps */
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect, useState } from "react";
// react icons
import { MdPermMedia } from "react-icons/md";
import { FaFacebookMessenger, FaUserFriends } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import { useProfilePost } from "../context/ProfilePost";
import axios from "axios";
import PeopleList from "../components/PeopleList";
import ImageUploadPopup from "../components/popup/ImageUploadPopup";
import EditProfile from "../components/EditProfile";
import ImageViewerPopup from "../components/popup/ImageViewerPopup";

export default function Profile() {
  const navigate = useNavigate();
  // popups
  const [followerList, setFollowerList] = useState(false);
  const [followingList, setFollowingList] = useState(false);

  const [uploadPopup, setUploadPopup] = useState(false);
  const [coverUploadPopup, setCoverUploadPopup] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showCoverPic, setShowCoverPic] = useState(false);

  // for values
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  // hooks
  const { getProfilePost, posts, loading } = useProfilePost();
  const {
    getUserDetails,
    loading: detailsLoading,
    user,
    setUser,
  } = useUserDetails();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { username } = useParams();

  useEffect(() => {
    getProfilePost(username);
    getUserDetails(username);
    if (username == auth?.username) {
      getFollowers();
    }
  }, [
    username,
    posts?.length,
    user.followers?.length,
    user.followings?.length,
  ]);

  const getFollowers = async () => {
    const { data } = await axios.get(`/api/user/followers/${username}`);
    // console.log(data);
    if (data.success) {
      setFollower(data.user.followers);
      setFollowing(data.user.followings);
    }
  };

  // <Layout>

  const followUnfollow = async () => {
    const { data } = await axios.put(`/api/user/follow-unfollow/${username}`);
    if (data.success) {
      if (user.followers?.includes(auth?._id)) {
        setUser({
          ...user,
          followers: user.followers.filter((i) => i !== auth?._id),
        });
      } else {
        setUser({ ...user, followers: [...user.followers, auth?._id] });
      }
    }
  };

  return (
    <div className="  bg-base-200">
      <div>
        <div className="flex flex-col ">
          {/* cover and profile  */}
          <div className="relative h-[400px]  w-full">
            <img
              onClick={() => setShowCoverPic(true)}
              className="h-[70%] cursor-pointer object-cover object-center w-full"
              src={user?.coverPic}
              alt="cover-image"
            />

            {/* cover pic upload btn  */}
            {username == auth?.username && (
              <div
                title="cover picture"
                onClick={() => setCoverUploadPopup((p) => !p)}
                className="absolute flex  justify-center items-center btn btn-sm btn-circle btn-warning top-[65%]  z-10 left-0 "
              >
                <span>
                  <BiSolidImageAdd size={20} />
                </span>
              </div>
            )}
            {coverUploadPopup && (
              <ImageUploadPopup
                title={"Cover"}
                setPopup={setCoverUploadPopup}
              />
            )}
            {showProfilePic && (
              <ImageViewerPopup
                action={setShowProfilePic}
                img={user?.profilePic}
              />
            )}
            {showCoverPic && (
              <ImageViewerPopup action={setShowCoverPic} img={user?.coverPic} />
            )}

            <div className="absolute flex flex-col items-center  translate-x-[-50%] translate-y-[-50%] left-[50%] top-[70%]">
              <div className="h-[170px] relative bg-white w-[170px]  rounded-full flex justify-center items-center border-[5px] border-gray-400">
                {user && !detailsLoading ? (
                  <img
                    onClick={() => setShowProfilePic(true)}
                    className="h-full cursor-pointer w-full rounded-full object-cover object-center"
                    alt={user?.username}
                    src={user?.profilePic}
                  />
                ) : (
                  <>
                    <span className=" loading loading-spinner scale-150"></span>
                  </>
                )}
                {username == auth?.username && (
                  <div
                    onClick={() => setUploadPopup((p) => !p)}
                    className="absolute flex  justify-center items-center btn btn-sm btn-circle btn-primary bottom-0 z-10 right-[10%] "
                  >
                    <span>
                      <BiSolidImageAdd size={20} />
                    </span>
                  </div>
                )}
              </div>

              <div className=" flex flex-col items-center">
                {user && !detailsLoading ? (
                  <h1 className="text-2xl capitalize  text-nowrap md:text-3xl font-bold">
                    {user.fullName}
                  </h1>
                ) : (
                  <>
                    <span className="loading loading-dots"></span>
                  </>
                )}
                <span className="text-lg text-gray-700 font-semibold">
                  {user?.username}
                </span>
                {user && (
                  <div className="flex items-center gap-3">
                    <span className="md:text-md text-sm text-gray-600 font-semibold">
                      {user.followers?.length} followers
                    </span>
                    <span className="text-2xl">&#183;</span>
                    <span className="md:text-md text-sm text-gray-600 font-semibold">
                      {user.followings?.length} followings
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* image upload popup */}

          {uploadPopup && (
            <ImageUploadPopup title={"Profile"} setPopup={setUploadPopup} />
          )}
        </div>
        <div className="divider m-0 p-0"></div>
        {/* feed  */}
        <div className="max-w-[768px] flex flex-col gap-5 mx-auto">
          <div
            className={
              username == auth?.username
                ? "bg-gray-300 w-[90%] md:w-[80%] mx-auto rounded-lg p-2 gap-2 flex justify-around "
                : "bg-gray-300 w-[90%] md:w-auto mx-auto rounded-lg p-2 gap-2 flex justify-around "
            }
          >
            {/* follower list button  */}
            {username == auth?.username && (
              <p
                onClick={() => setFollowerList((p) => !p)}
                className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
              >
                <FaUserFriends />{" "}
                <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                  Followers
                </span>
              </p>
            )}
            {/* following list button  */}
            {username == auth?.username && (
              <p
                onClick={() => setFollowingList((p) => !p)}
                className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
              >
                <FaUserFriends />{" "}
                <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                  Followings
                </span>
              </p>
            )}
            {followingList && following && (
              <PeopleList
                data={following}
                action={setFollowingList}
                title={"followings"}
              />
            )}
            {followerList && follower && (
              <PeopleList
                data={follower}
                title={"followers"}
                action={setFollowerList}
              />
            )}
            {/* follow unfollow button  */}
            {username !== auth?.username && (
              <button
                onClick={followUnfollow}
                className={
                  user.followers?.includes(auth?._id)
                    ? " flex items-center text-black  gap-2 btn btn-active btn-md"
                    : " flex items-center text-white gap-2 btn btn-success btn-md"
                }
              >
                {user.followers?.includes(auth?._id) ? (
                  <RiUserFollowFill />
                ) : (
                  <IoPersonAdd />
                )}{" "}
                <span className=" text-sm  text-nowrap md:text-[17px] font-semibold">
                  {user.followers?.includes(auth?._id) ? "Following" : "Follow"}
                </span>
              </button>
            )}
            {/* message button  */}
            {username !== auth?.username && (
              <button
                onClick={() => navigate(`/chats/${username}`)}
                className="flex btn btn-primary items-center hover:text-white gap-2 py-3 px-4 "
              >
                <FaFacebookMessenger />
                <span className=" text-sm capitalize text-nowrap md:text-[17px] font-semibold">
                  message
                </span>
              </button>
            )}
            {/* photos button  */}
            {username == auth?.username && (
              <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
                <MdPermMedia />{" "}
                <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                  {username == auth?.username ? "Your" : ""} Photos
                </span>
              </p>
            )}
          </div>
          {/* edit profile  */}
          {username == auth?.username && (
            <div className="flex items-center">
              <button
                onClick={() => setEditProfile(true)}
                className="flex items-center text-white btn btn-error btn-sm"
              >
                <FiEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          )}

          {/* edit profile display  */}
          {editProfile && user && (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#000000a9] z-[111] ">
              <EditProfile data={user} action={setEditProfile} />
            </div>
          )}

          {/* create post  */}
          {auth?.username == username && <CreatePost />}
          <span className="text-xl font-semibold">Posts</span>
          {/* <Post /> */}
          <div className="flex flex-col mb-3 gap-5">
            {loading ? (
              <div className="flex h-[30dvh] items-center justify-center">
                {" "}
                <span className="loading scale-150 loading-spinner"></span>{" "}
              </div>
            ) : posts?.length ? (
              posts.map((item, id) => <Post key={id} id={id} item={item} />)
            ) : (
              <div>
                {" "}
                <p>Follow some people to view some posts.</p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
