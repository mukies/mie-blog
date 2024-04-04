/* eslint-disable react-hooks/exhaustive-deps */
// import CreatePost from "../components/CreatePost";
// import Post from "../components/Post";
import { useEffect, useRef, useState } from "react";
// react icons
import { MdPermMedia } from "react-icons/md";
import { FaFacebookMessenger, FaTimes, FaUserFriends } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
// import { useProfilePost } from "../context/ProfilePost";
import axios from "axios";
import PeopleList from "../components/PeopleList";
import ImageUploadPopup from "../components/popup/ImageUploadPopup";
import EditProfile from "../components/EditProfile";
import ImageViewerPopup from "../components/popup/ImageViewerPopup";
import { toast } from "react-toastify";
import ProfilePost from "../components/ProfilePost";
import usePreviewImg from "../hooks/usePreviewImg";

export default function Profile() {
  const navigate = useNavigate();
  const [unfollowed, setUnfollowed] = useState([]);
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

  const [profilePostLoading, setProfilePostLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // create post
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const postRef = useRef();
  const { previewImg, imgUrl, setImgUrl } = usePreviewImg();
  const [postingLoading, setPostingLoading] = useState(false);

  // hooks
  const {
    getUserDetails,
    loading: detailsLoading,
    user,
    setUser,
  } = useUserDetails();

  const auth = JSON.parse(localStorage.getItem("_L"));
  const { username } = useParams();

  useEffect(() => {
    getProfilePost();
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

  // profile post
  const getProfilePost = async () => {
    try {
      const { data } = await axios.get(`/api/post/profile-post/${username}`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error("error while fetching feed post.");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setProfilePostLoading(false);
    }
  };

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

  const handlePost = async () => {
    if (!postingLoading) {
      if (!text && !imgUrl) {
        toast.error("Nothing to post");
      } else {
        //
        setPostingLoading(true);
        try {
          const { data } = await axios.post("/api/post/add", {
            text,
            image: imgUrl,
          });
          if (data.success) {
            // window.location.reload();
            setPosts((p) => [...p, data.post]);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setPostingLoading(false);
        }

        //
        // await addPost(text, imgUrl);
        setShow(false);
        setText("");
      }
    }
  };
  return (
    <div className="  bg-white">
      <div>
        <div className="flex flex-col mb-5 sm:mb-0 ">
          {/* cover and profile  */}
          <div className="relative sm:h-[400px] h-[300px] mb-5 sm:mb-0  w-full">
            <img
              onClick={() => setShowCoverPic(true)}
              className="h-[70%] cursor-pointer object-cover object-center w-full"
              src={user?.coverPic ? user?.coverPic : "/coverIMG.jpg"}
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
                  <h1 className="text-2xl text-black capitalize whitespace-nowrap sm:text-3xl font-bold">
                    {user.fullName}
                  </h1>
                ) : (
                  <>
                    <span className="loading loading-dots"></span>
                  </>
                )}
                <span className="text-[15px] text-gray-700 font-semibold">
                  {user?.username}
                </span>
                {user && (
                  <div className="flex whitespace-nowrap items-center gap-3">
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
        <div className="divider hidden sm:block m-0 p-0"></div>
        {/* feed  */}
        <div className="max-w-[768px] flex flex-col gap-5 mx-auto">
          <div
            className={
              username == auth?.username
                ? "bg-gray-300 w-[90%] sm:max-w-max mx-auto rounded-lg p-2 gap-2 flex justify-around "
                : "bg-gray-300  md:w-auto mx-auto rounded-lg p-2 gap-2 flex justify-around "
            }
          >
            {/* follower list button  */}
            {username == auth?.username && (
              <p
                onClick={() => setFollowerList((p) => !p)}
                className=" flex items-center gap-2 py-3 px-4 rounded-lg text-black hover:bg-gray-100 duration-200 cursor-pointer"
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
                className=" flex items-center text-black gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
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
                unfollowed={unfollowed}
                setUnfollowed={setUnfollowed}
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
                    ? " flex items-center text-black  gap-2 btn bg-gray-300 border-gray-400 btn-md"
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
                className="flex btn btn-primary items-center text-white  gap-2 py-3 px-4 "
              >
                <FaFacebookMessenger />
                <span className=" text-sm capitalize text-nowrap md:text-[17px] font-semibold">
                  message
                </span>
              </button>
            )}
            {/* photos button  */}
          </div>
          {/* edit profile  */}
          {username == auth?.username && (
            <div className="flex px-4 items-center">
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
          {auth?.username == username && (
            <div className=" flex py-2  justify-center rounded-3xl flex-col gap-2  ">
              <div className="flex bg-white w-full max-w-[550px] rounded-2xl mx-auto px-2 justify-between  gap-3  py-2 md:p-5 items-center">
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex justify-center items-center overflow-hidden cursor-pointer ">
                  <img
                    alt={user?.username}
                    className=" object-cover object-center w-full h-full"
                    src={user?.profilePic}
                  />
                </div>
                <div
                  onClick={() => {
                    setShow((p) => !p);
                    setTimeout(() => {
                      postRef.current.focus();
                    }, 1);
                  }}
                  className="flex-1"
                >
                  <input
                    type="text"
                    placeholder="What's on your mind..."
                    className="input w-full mx-auto bg-gray-200 input-md text-black rounded-3xl"
                  />
                </div>
                <div
                  onClick={() => {
                    setShow((p) => !p);
                    setTimeout(() => {
                      postRef.current.focus();
                    }, 1);
                  }}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3"
                >
                  <MdPermMedia size={30} color="#316ff6" />
                </div>
              </div>

              <div
                className={
                  show
                    ? "fixed top-0 left-0 right-0 bottom-0 flex z-[100] justify-center items-center bg-[#000000b4]"
                    : "fixed top-0 left-0 right-0 bottom-0 hidden z-[100] justify-center items-center bg-[#000000b4]"
                }
              >
                <div className="bg-white relative md:rounded-lg justify-center items-center  p-3 flex h-[100dvh] w-full md:h-auto md:w-[60%]  lg:w-[50%] flex-col ">
                  <div
                    onClick={() => setShow((p) => !p)}
                    className="absolute btn bg-gray-200 border-none btn-circle top-[2px] cursor-pointer right-[2px]"
                  >
                    <span>
                      <FaTimes size={28} color="#316ff6" />
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <span className="text-center mb-5 sm:mb-0 text-black text-3xl font-semibold">
                      Create a post
                    </span>
                    <span className="divider hidden sm:block p-0 m-0"></span>
                    {/* user name and image  */}
                    <div className=" flex mb-2 items-center gap-3">
                      <img
                        className="h-[30px] w-[30px] rounded-full object-cover object-center cursor-pointer"
                        src={user?.profilePic}
                        alt={user?.username}
                      />
                      <span className="text-lg font-semibold text-black capitalize ">
                        {user?.fullName}
                      </span>
                    </div>

                    <div className="h-[30%]">
                      <div className="h-full px-5">
                        <textarea
                          ref={postRef}
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                          type="text"
                          placeholder="What's on your mind..."
                          className="textarea textarea-bordered  w-full h-full  bg-gray-200 text-black  rounded-3xl"
                        />
                      </div>
                    </div>
                    <div className=" flex justify-around mx-auto px-5">
                      <label
                        htmlFor="file"
                        className="flex items-center gap-2 cursor-pointer text-black hover:bg-gray-300 rounded-lg duration-200 px-4 py-3"
                      >
                        <MdPermMedia size={30} color="#316ff6" />
                        <span className="text-lg font-semibold">Photo</span>

                        <input
                          onChange={previewImg}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="file"
                        />
                      </label>
                    </div>
                    {imgUrl ? (
                      <div className=" w-full flex justify-center  rounded-lg">
                        <div className="h-[150px] relative">
                          <div
                            onClick={() => setImgUrl(null)}
                            className="absolute top-0 right-0 btn btn-sm btn-circle"
                          >
                            <span>
                              <FaTimes size={20} color="#316ff6" />
                            </span>
                          </div>
                          <img
                            className="h-full w-[200px] object-cover"
                            // src={URL.createObjectURL(image)}

                            src={imgUrl}
                            alt="photo"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={handlePost}
                      className="flex items-center  btn btn-success justify-center text-white "
                    >
                      {/* <IoMdVideocam size={30} color="#8b0000" /> */}
                      {postingLoading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg  font-semibold">Post</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* create post  */}
          <div className="  flex justify-between items-center px-3">
            <span className="text-lg sm:text-xl text-black font-semibold">
              Posts
            </span>
            {username == auth?.username && (
              <p
                onClick={() => navigate("/photos")}
                className=" flex items-center gap-2 py-3 px-4 rounded-lg text-black hover:bg-gray-300 duration-200 cursor-pointer"
              >
                <MdPermMedia size={20} />{" "}
                <span className=" text-lg  text-nowrap sm:text-[17px] font-semibold">
                  Your Photos
                </span>
              </p>
            )}
          </div>
          {/* <Post /> */}
          <div className="flex flex-col mb-3 gap-5">
            {profilePostLoading ? (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[97] flex justify-center items-center">
                <span className="loading loading-spinner scale-125"></span>
              </div>
            ) : posts?.length ? (
              posts.map((item, id) => (
                <ProfilePost
                  key={item._id}
                  id={id}
                  setPosts={setPosts}
                  item={item}
                />
              ))
            ) : (
              <div className="h-[40dvh] flex justify-center items-center ">
                <p className="text-xl font-semibold">
                  You have not create a post.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
