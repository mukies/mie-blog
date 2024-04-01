/* eslint-disable react/prop-types */
import { FaHeart, FaUserFriends } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Popup from "../popup/Popup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FriendListPopup from "./FriendListPopup";
import { timeAgo } from "../../helper/dateFormater";

export default function UserPost({ post, setPosts }) {
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [likeListPopup, setLikeListPopup] = useState(false);

  const handleDelete = async () => {
    if (!deleteLoading) {
      setDeleteLoading(true);
      try {
        const { data } = await axios.delete(
          `/api/post/admin-delete-post/${post._id}`
        );
        if (data.success) {
          setPosts((p) => p.filter((pst) => pst._id !== post._id));
        } else {
          toast.error("Failed to delete post");
        }
      } catch (error) {
        toast.error("Failed to delete post");
      } finally {
        setDeletePopup(false);
        setDeleteLoading(false);
      }
    }
  };
  return (
    <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
      <div className=" flex flex-col gap-5">
        {/* title  */}
        <div className="flex  justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover object-center"
                alt="user-profile"
                src={post.postedBy?.profilePic}
              />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-semibold capitalize">
                {post.postedBy?.fullName}
              </h1>
              <span className="text-gray-700 flex items-center gap-2">
                {timeAgo(new Date(post.createdAt))} <FaUserFriends />
              </span>
            </div>
          </div>
          <div onClick={() => setDeletePopup(true)} className="btn btn-circle ">
            <FaTrash size={20} color="red" />
          </div>
        </div>
        {deletePopup && (
          <Popup handleDelete={handleDelete} cancel={setDeletePopup} />
        )}

        {/* text content  */}
        {post.text.length ? (
          <div onClick={() => navigate(`/admin/post/${post._id}`)}>
            <p className="">
              {post.text.length < 300
                ? post.text
                : post.text.substring(0, 300) + "..."}
              {post.text.length < 300 ? (
                ""
              ) : (
                <span className="text-blue-700 cursor-pointer text-lg">
                  see more
                </span>
              )}
            </p>
          </div>
        ) : (
          ""
        )}
        {/* image content  */}
        {post.image ? (
          <div
            onClick={() => navigate(`/admin/post/${post._id}`)}
            className="w-[99%] rounded-2xl overflow-hidden md:w-[90%] cursor-pointer duration-200 transition-all h-[80vh] mx-auto "
          >
            <img
              className=" w-full h-full object-cover object-center"
              alt="image-content"
              src={post.image}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-5 w-[90%] mx-auto">
        <div
          onClick={() => setLikeListPopup(true)}
          className="flex cursor-pointer items-center gap-3"
        >
          <FaHeart size={15} color="#316ff6" />
          <span>{post.likes?.length} likes</span>
        </div>
        <div className="flex items-center gap-3">
          <MdOutlineChat size={17} color="#316ff6" />
          <span>{post.comments?.length} comments</span>
        </div>
      </div>
      {likeListPopup && (
        <FriendListPopup
          title={"likes"}
          data={post?.likes}
          action={setLikeListPopup}
        />
      )}
    </div>
  );
}
