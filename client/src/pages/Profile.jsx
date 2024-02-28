import { MdPermMedia } from "react-icons/md";
import CreatePost from "../components/CreatePost";
import { FaUserFriends } from "react-icons/fa";
import Post from "../components/Post";

export default function Profile() {
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
              <img
                className="  h-[170px] w-[170px] rounded-full border-[5px] border-white  object-cover object-center"
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
              <div className=" flex flex-col items-center">
                <h1 className="text-2xl text-nowrap md:text-3xl font-bold">
                  mukesh Bhattarai
                </h1>
                <span className="text-xl text-gray-600 font-semibold">
                  50 friends
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="divider m-0 p-0"></div>
        {/* feed  */}
        <div className="max-w-[768px] flex flex-col gap-5 mx-auto">
          <div className="bg-gray-300 w-[70%] mx-auto rounded-lg p-2 flex justify-around ">
            <p className=" flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
              <FaUserFriends />{" "}
              <span className="text-xl font-semibold">All Friends</span>
            </p>
            <p className=" flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
              <MdPermMedia />{" "}
              <span className="text-xl font-semibold">Your Photos</span>
            </p>
          </div>
          {/* create post  */}
          <CreatePost />
          <span className="text-xl font-semibold">Posts</span>
          <Post />
        </div>
      </div>
    </div>
  );
}
