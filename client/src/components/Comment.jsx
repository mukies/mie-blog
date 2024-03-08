/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from "axios";

export default function Comment({ item: items, commentId, postId }) {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [item, setItem] = useState(items);
  const [cmntLike, setCmntLike] = useState(item.likes.includes(auth?._id));

  const handleLike = async () => {
    if (items.likes.includes(auth._id)) {
      setItem({
        ...item,
        likes: item.likes.filter((id) => id !== auth._id),
      });
    } else {
      setItem({ ...item, likes: [...item.likes, auth._id] });
    }
    setCmntLike((p) => !p);
    await axios.put(`/api/post/${postId}/comment/like-unlike/${commentId}`);
  };

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
          <h1 className="text-xl font-semibold">{item.commentedBy.fullName}</h1>
          {/* <span className="text-gray-700">Just now</span> */}
        </div>
      </div>
      <div className="p-3 flex flex-col gap-3 ml-8 rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-0 bg-gray-300 max-w-[250px]">
        <p className="py-2">{item.content}</p>
        <div className="divider m-0 p-0"></div>
        <div className=" flex items-center gap-2   rounded-md">
          {cmntLike || item.likes.includes(auth?._id) ? (
            <FaHeart
              className="cursor-pointer"
              onClick={handleLike}
              size={25}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={handleLike}
              size={25}
            />
          )}
          <div className="flex items-center gap-7">
            <span className="text-lg font-semibold">Like</span>
            <p className="text-[14px] flex items-center gap-1 text-[#316ff6] font-bold">
              <span>{item.likes.length}</span>
              <BsFillPeopleFill />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
