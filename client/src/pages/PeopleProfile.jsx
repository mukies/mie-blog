import { useEffect } from "react";
import Post from "../components/Post";
import { MdPermMedia } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Layout from "../components/layout/user/Layout";
import { useProfilePost } from "../hooks/useProfilePost";

export default function PeopleProfile() {
  const { getProfilePost, loading, posts } = useProfilePost();
  const auth = JSON.parse(localStorage.getItem("_L"));

  useEffect(() => {
    getProfilePost(auth?._id);
  }, []);
  return (
    <Layout>
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
                <img
                  className="  h-[170px] w-[170px] rounded-full border-[5px] border-white  object-cover object-center"
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
                <div className=" flex flex-col items-center">
                  <h1 className="text-2xl text-nowrap md:text-3xl font-bold">
                    mukesh Bhattarai
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="md:text-md text-sm text-gray-600 font-semibold">
                      50 followers
                    </span>
                    <span className="text-2xl">&#183;</span>
                    <span className="md:text-md text-sm text-gray-600 font-semibold">
                      50 followings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider m-0 p-0"></div>
          {/* feed  */}
          <div className="max-w-[768px] flex flex-col gap-5 mx-auto">
            <div className="bg-gray-300 w-[90%] md:w-[70%] mx-auto rounded-lg p-2 flex justify-around ">
              <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
                <FaUserFriends />{" "}
                <span className=" text-sm text-nowrap md:text-xl font-semibold">
                  All Friends
                </span>
              </p>
              <p className=" flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
                <MdPermMedia />{" "}
                <span className=" text-sm text-nowrap md:text-xl font-semibold">
                  Your Photos
                </span>
              </p>
            </div>

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
    </Layout>
  );
}
