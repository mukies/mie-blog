import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import Comment from "../components/Comment";
import Layout from "../components/layout/user/Layout";

export default function PostPage() {
  const [like, setLike] = useState(false);

  const text2 =
    "hello wowrsjkjds dj fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs hsjhfhjdjfhgdjfgdjfdgjfhdfjdfhfdjfjhdfhf dfjdfjhsdfj jh kjhkjhdkfh kjdfjhfkjdfh jhfjkdk jfkjdfkjkjs jk sjdkskjsfk  s fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs sjdkskjsfk  s fs fkssjfkskfkf d djkdj skdjsdj jsdsdkjfs sjdkskjsfk  s fs fkssjfkskfkf99";
  return (
    <Layout>
      <div className="max-w-[768px] mx-auto flex flex-col gap-3 py-3">
        <div className=" w-[10%]">
          <button className="btn hover:bg-[#316ff6] border-[#316ff6] text-[#316ff6] hover:border-[#316ff6] btn-sm btn-outline">
            back
          </button>
        </div>
        <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
          <div className=" flex flex-col gap-5">
            {/* title  */}
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

            {/* text content  */}
            <div>
              <p className="">{text2}</p>
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
          <div className="divider m-0 p-0 w-[90%] mx-auto"></div>

          {/* like comment */}
          <div className="flex w-[99%] md:w-[90%] justify-around px-5 mx-auto  items-center ">
            <div className="flex w-full items-center gap-[50px]">
              {/* <p>50 people likes this.</p> */}
              <div className="flex  items-center gap-3">
                {like ? (
                  <FaHeart
                    className="cursor-pointer"
                    onClick={() => setLike((p) => !p)}
                    size={30}
                    color="#316ff6"
                  />
                ) : (
                  <FaRegHeart
                    className="cursor-pointer"
                    onClick={() => setLike((p) => !p)}
                    size={30}
                    color="#316ff6"
                  />
                )}
                <span className="font-semibold ">Like</span>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineChat
                  className="cursor-pointer"
                  size={30}
                  color="#316ff6"
                />
                <span className="font-semibold ">Comment</span>
              </div>
            </div>
          </div>
        </div>
        <span className="text-2xl font-semibold border-b-2 border-red-400 inline-block">
          Comments
        </span>
        {/* comments  */}
        <div className="flex mt-4 flex-col gap-5">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </Layout>
  );
}
