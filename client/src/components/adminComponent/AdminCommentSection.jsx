/* eslint-disable react/prop-types */
import { BsFillPeopleFill } from "react-icons/bs";
import Popup from "../popup/Popup";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminCommentSection({
  comment,
  postId,
  setPost,
  post,
}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCmntDelete = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const { data } = await axios.delete(
          `/api/post/${postId}/admin-delete-comment/${comment._id}`
        );
        if (data.success) {
          setPost({
            ...post,
            comments: post.comments?.filter((i) => i._id !== comment._id),
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col border-[1px] p-3 rounded-lg border-gray-300 gap-5">
      <div className="flex items-center w-full sm:max-w-[50%] justify-between ">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex justify-center items-center overflow-hidden rounded-full">
            <img
              onClick={() => {
                if (comment.commentedBy?.username) {
                  navigate(`/admin/users/${comment.commentedBy?.username}`);
                } else {
                  toast.error("User Unavailable");
                }
              }}
              className=" cursor-pointer h-full w-full object-center object-cover"
              alt="user-profile"
              src={
                comment.commentedBy?.profilePic
                  ? comment.commentedBy?.profilePic
                  : "/no.avif"
              }
            />
          </div>
          <div className="flex flex-col gap-0 ">
            <h1
              onClick={() => {
                if (comment.commentedBy?.username) {
                  navigate(`/admin/users/${comment.commentedBy?.username}`);
                } else {
                  toast.error("User Unavailable");
                }
              }}
              className="text-xl cursor-pointer font-semibold capitalize"
            >
              {comment.commentedBy?.fullName
                ? comment.commentedBy?.fullName
                : "user deleted"}
            </h1>
          </div>
        </div>

        <div onClick={() => setShow(true)} className="btn btn-circle">
          <span>
            <FaTrashAlt color="red" />
          </span>
        </div>

        {show && (
          <Popup
            text={"Are you sure ?"}
            cancel={setShow}
            handleDelete={handleCmntDelete}
          />
        )}
      </div>
      <div className="p-1 flex flex-col gap-3 ml-8 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-0 border-2 border-gray-800 max-w-[250px]">
        <div className="px-3">
          <p className="py-2 text-xl font-semibold">{comment.content}</p>
        </div>
        <div className="divider h-[1px] bg-black m-0 p-0"></div>
        <div className=" flex items-center gap-4 p-3  rounded-md">
          <div className="flex items-center gap-7">
            {/* <span className="text-lg font-semibold">Like</span> */}
            <p className="text-[14px] flex items-center gap-1  font-bold">
              <span>{comment.likes?.length}</span>
              <BsFillPeopleFill />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
