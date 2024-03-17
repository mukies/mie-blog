/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from "axios";
import useUserDetails from "../hooks/useUserDetails";
import Popup from "./popup/Popup";
import { useGetPost } from "../context/SinglePostContext";

export default function Comment({ item: items, commentId, postId, index }) {
  const { setPosts, posts } = useGetPost();

  const [show, setShow] = useState(false);
  const { getUserDetails, loading } = useUserDetails();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [item, setItem] = useState(items);
  const [cmntLike, setCmntLike] = useState(item.likes?.includes(auth?._id));
  useEffect(() => {
    if (auth) {
      getUserDetails(auth?.username);
    }
  }, [auth?.username]);

  const handleLike = async () => {
    if (auth) {
      if (item.likes?.includes(auth._id)) {
        setItem({
          ...item,
          likes: item.likes?.filter((id) => id !== auth?._id),
        });
      } else {
        setItem({ ...item, likes: [...item.likes, auth?._id] });
      }
      setCmntLike((p) => !p);
      await axios.put(`/api/post/${postId}/comment/like-unlike/${index}`);
    } else {
      alert("Please login first.");
    }
  };

  const handleCmntDelete = async () => {
    await axios.delete(`/api/post/${postId}/user-delete-comment/${commentId}`);

    setPosts({
      ...posts,
      comments: posts.comments?.filter((i) => i._id !== commentId),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center max-w-[50%] justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex justify-center items-center overflow-hidden rounded-full">
            {item && !loading ? (
              <img
                alt={item.commentedBy?.fullName}
                src={item.commentedBy?.profilePic}
              />
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </div>
          <div className="flex flex-col gap-0 ">
            <h1 className="text-xl font-semibold">
              {item.commentedBy?.fullName}
            </h1>
            {/* <span className="text-gray-700">Just now</span> */}
          </div>
        </div>
        {item.commentedBy?._id == auth?._id && (
          <div onClick={() => setShow(true)} className="btn btn-circle">
            <span>
              <FaTrashAlt color="red" />
            </span>
          </div>
        )}
        {show && (
          <Popup
            text={"Are you sure ?"}
            cancel={setShow}
            handleDelete={handleCmntDelete}
          />
        )}
      </div>
      <div className="p-3 flex flex-col gap-3 ml-8 rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-0 bg-gray-300 max-w-[250px]">
        <p className="py-2">{item.content}</p>
        <div className="divider m-0 p-0"></div>
        <div className=" flex items-center gap-4   rounded-md">
          {cmntLike || item.likes?.includes(auth?._id) ? (
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
            {/* <span className="text-lg font-semibold">Like</span> */}
            <p className="text-[14px] flex items-center gap-1 text-[#316ff6] font-bold">
              <span>{item.likes?.length}</span>
              <BsFillPeopleFill />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
