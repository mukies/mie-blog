/* eslint-disable react-hooks/exhaustive-deps */
import { MdPermMedia } from "react-icons/md";
import CreatePost from "../components/CreatePost";
import { FaUserFriends } from "react-icons/fa";
import Post from "../components/Post";
// import Layout from "../components/layout/user/Layout";
import { useProfilePost } from "../hooks/useProfilePost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import useUserDetails from "../hooks/useUserDetails";

export default function Profile() {
  const { getProfilePost, loading, posts } = useProfilePost();
  const { getUserDetails, loading: detailsLoading, user } = useUserDetails();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { username } = useParams();

  useEffect(() => {
    getProfilePost(username);
    getUserDetails(username);
  }, [username]);
  // <Layout>
  return (
    <div className=" bg-base-200">
      <div>
        <div className="flex flex-col ">
          {/* cover and profile  */}
          <div className="relative h-[400px]  w-full">
            <img
              className="h-[70%] object-cover object-center w-full"
              src="/cover.jpg"
              alt="cover-image"
            />
            <div className="absolute flex flex-col items-center  translate-x-[-50%] translate-y-[-50%] left-[50%] top-[70%]">
              <div className="h-[170px] relative bg-white w-[170px]  rounded-full flex justify-center items-center border-[5px] border-gray-400">
                {user && !detailsLoading ? (
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    alt={user?.username}
                    src={user?.profilePic}
                  />
                ) : (
                  <>
                    <span className=" loading loading-spinner scale-150"></span>
                  </>
                )}
                {username == auth?.username && (
                  <div className="absolute flex  justify-center items-center btn btn-sm btn-circle btn-primary bottom-0 z-10 right-[10%] ">
                    <span>
                      <BiSolidImageAdd size={20} />
                    </span>
                  </div>
                )}
              </div>
              <div className=" flex flex-col items-center">
                {user && !detailsLoading ? (
                  <h1 className="text-2xl text-nowrap md:text-3xl font-bold">
                    {user.fullName}
                  </h1>
                ) : (
                  <>
                    <span className="loading loading-dots"></span>
                  </>
                )}
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
            {username == auth?.username && (
              <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
                <FaUserFriends />{" "}
                <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                  Followers
                </span>
              </p>
            )}
            {username == auth?.username && (
              <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
                <FaUserFriends />{" "}
                <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                  Followings
                </span>
              </p>
            )}
            {username !== auth?.username && (
              <button className=" flex items-center text-white gap-2 btn btn-success btn-md">
                <IoPersonAdd />{" "}
                <span className=" text-sm  text-nowrap md:text-[17px] font-semibold">
                  Follow
                </span>
              </button>
            )}

            <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
              <MdPermMedia />{" "}
              <span className=" text-sm text-nowrap md:text-[17px] font-semibold">
                {username == auth?.username ? "Your" : ""} Photos
              </span>
            </p>
          </div>
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
              posts.map((item, id) => <Post key={id} item={item} />)
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
