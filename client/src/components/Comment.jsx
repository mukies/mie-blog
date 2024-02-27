import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

export default function Comment() {
  const [cmntLike, setCmntLike] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="w-8 overflow-hidden rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-xl font-semibold">Mukesh Bhattarai</h1>
          {/* <span className="text-gray-700">Just now</span> */}
        </div>
      </div>
      <div className="p-3 flex flex-col gap-3 ml-8 rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-0 bg-gray-300 max-w-[250px]">
        <p className="py-2">
          nice picture Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Totam obcaecati officia quo tempore iure, quibusdam voluptatem
          molestias sit eum beatae.
        </p>
        <div className="divider m-0 p-0"></div>
        <div className=" flex items-center gap-2   rounded-md">
          {cmntLike ? (
            <FaHeart
              className="cursor-pointer"
              onClick={() => setCmntLike((p) => !p)}
              size={25}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={() => setCmntLike((p) => !p)}
              size={25}
            />
          )}
          <div className="flex items-center gap-7">
            <span className="text-lg font-semibold">Like</span>
            <p className="text-[14px] flex items-center gap-1 text-[#316ff6] font-bold">
              <span>50</span>
              <BsFillPeopleFill />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
