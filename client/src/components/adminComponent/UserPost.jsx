import { FaHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdOutlineChat } from "react-icons/md";

export default function UserPost() {
  const text2 =
    "hello wowrsjkjds dj fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs hsjhfhjdjfhgdjfgdjfdgjfhdfjdfhfdjfjhdfhf dfjdfjhsdfj jh kjhkjhdkfh kjdfjhfkjdfh jhfjkdk jfkjdfkjkjs jk sjdkskjsfk  s fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs sjdkskjsfk  s fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs sjdkskjsfk  s fs fkssjfkskfkf99";

  return (
    <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
      <div className=" flex flex-col gap-5">
        {/* title  */}
        <div className="flex  justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 overflow-hidden rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-semibold">Mukesh Bhattarai</h1>
              <span className="text-gray-700">Just now</span>
            </div>
          </div>
          <div className="cursor-pointer p-2 hover:bg-slate-200 rounded-xl duration-150">
            <IoIosMore size={30} />
          </div>
        </div>

        {/* text content  */}
        <div>
          <p className="">
            {text2.length < 300 ? text2 : text2.substring(0, 300) + "..."}
            {text2.length < 300 ? (
              ""
            ) : (
              <span className="text-blue-700 cursor-pointer text-lg">
                see more
              </span>
            )}
          </p>
        </div>
        {/* image content  */}
        <div className="w-[99%] rounded-2xl overflow-hidden md:w-[90%] duration-200 transition-all h-[80vh] mx-auto ">
          <img
            className=" w-full h-full object-cover object-center"
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="flex items-center gap-5 w-[90%] mx-auto">
        <div className="flex items-center gap-3">
          <FaHeart size={15} color="#316ff6" />
          <span>5 likes</span>
        </div>
        <div className="flex items-center gap-3">
          <MdOutlineChat size={17} color="#316ff6" />
          <span>3 comments</span>
        </div>
      </div>
    </div>
  );
}
