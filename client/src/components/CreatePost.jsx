import { MdPermMedia } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";

export default function CreatePost() {
  return (
    <div className=" flex py-3 justify-center flex-col gap-3">
      <div className="flex bg-white rounded-3xl justify-between mx-auto gap-3  w-[80%] py-2 md:p-5 items-center">
        <div className="w-[60px] rounded-full overflow-hidden cursor-pointer">
          <img
            alt="Tailwind CSS Navbar component"
            className=""
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's on your mind..."
            className="input w-full bg-gray-200 md:input-lg sm:input-md  rounded-3xl"
          />
        </div>
      </div>
      <div className="w-[80%] flex justify-between mx-auto px-5">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3">
          <IoMdVideocam size={30} color="#8b0000" />
          <span className="text-lg font-semibold">Live</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3">
          <MdPermMedia size={30} color="#316ff6" />
          <span className="text-lg font-semibold">Photo/Video</span>
        </div>
        <button className="btn btn-success rounded-xl font-bold text-white">
          Post
        </button>
      </div>
    </div>
  );
}
