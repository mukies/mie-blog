/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaTrash, FaUserFriends } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Popup from "./popup/Popup";
import { useFeed } from "../context/FeedContext";
import { useProfilePost } from "../context/ProfilePost";
import { timeAgo } from "../helper/dateFormater";
import { toast } from "react-toastify";

export default function Post({ item: items, id }) {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [item, setItem] = useState(items);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const text = item.text;
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setPosts, loading: feedLoding } = useFeed();
  const { setPosts: setPost } = useProfilePost();
  const [like, setLike] = useState(item.likes.includes(auth._id));

  // like and unlike
  const handleLike = async () => {
    console.log("like", like);
    if (item.likes.includes(auth._id)) {
      setItem({ ...item, likes: item.likes.filter((id) => id !== auth._id) });
      // const updated = posts.map((p) => {
      //   if (p._id == item._id) {
      //     return { ...p, likes: p.likes?.filter((l) => l._id == auth?._id) };
      //   }
      //   return p;
      // });
      // setPosts(updated);
      setLike((p) => !p);
    } else {
      setItem({ ...item, likes: [...item.likes, auth._id] });
      // const updated = posts.map((p) => {
      //   if (p._id == item._id) {
      //     return { ...p, likes: [...p.likes, auth?._id] };
      //   }
      //   return p;
      // });

      // setPosts(updated);
      setLike((p) => !p);
    }

    await axios.put(`/api/post/like-unlike/${item._id}`);
  };

  // commenting

  const handleComment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/post/add-comment/${item._id}`, {
        text: comment,
      });
      if (data.success) {
        setItem({
          ...item,
          comments: [...item.comments, { topic: "new comment added" }],
        });
        setComment("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const { data } = await axios.delete(
      `/api/post/user-delete-post/${item._id}`
    );
    if (data.success) {
      setPosts((p) => p.filter((i, index) => index != id));
      setPost((p) => p.filter((i, index) => index != id));
    }
  };

  return (
    <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-0 sm:px-4 py-5 ">
      {/* content  */}
      <div className=" flex flex-col gap-5 ">
        {/* title  */}
        <div className="flex px-1 sm:px-3 items-center justify-between">
          <div className=" flex items-center gap-4">
            <div className="w-10 h-10 flex justify-center items-center overflow-hidden cursor-pointer rounded-full">
              {item || !feedLoding ? (
                <img
                  onClick={() => {
                    if (item.postedBy?.username) {
                      navigate(`/profile/${item.postedBy.username}`);
                    } else {
                      toast.error("User not available");
                    }
                  }}
                  className="object-cover object-center h-full w-full"
                  alt="user-image"
                  src={
                    item.postedBy?.profilePic
                      ? item.postedBy?.profilePic
                      : "/no.avif"
                  }
                />
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </div>
            <div className="flex flex-col gap-0">
              <h1
                onClick={() => {
                  if (item.postedBy?.username) {
                    navigate(`/profile/${item.postedBy.username}`);
                  } else {
                    toast.error("User not available");
                  }
                }}
                className="text-lg sm:text-xl text-black cursor-pointer capitalize font-semibold"
              >
                {item.postedBy?.fullName
                  ? item.postedBy?.fullName
                  : "user unavailable"}
              </h1>
              <span className="text-gray-700 flex items-center gap-2">
                {timeAgo(new Date(item.createdAt))}
                <FaUserFriends />
              </span>
            </div>
          </div>
          {item.postedBy?._id == auth?._id && (
            <div
              onClick={() => setShowPopup((p) => !p)}
              className=" bg-white border-gray-300 btn btn-circle "
            >
              <span>
                <FaTrash color="red" />
              </span>
            </div>
          )}
          {showPopup && (
            <Popup
              text={"Are you sure ?"}
              handleDelete={handleDelete}
              cancel={setShowPopup}
            />
          )}
        </div>

        {/* text content  */}
        {text && (
          <div
            onClick={() => navigate(`/post/${item._id}`)}
            className="w-[90%] bg-gray-200 p-2 sm:p-3 rounded-md overflow-hidden md:w-[80%] duration-200 transition-all  mx-auto"
          >
            <p className=" text-black">
              {text.length < 300 ? text : text.substring(0, 300) + "..."}
              {text.length < 300 ? (
                ""
              ) : (
                <span className="text-blue-700 cursor-pointer text-lg">
                  see more
                </span>
              )}
            </p>
          </div>
        )}
        {/* image content  */}
        {item.image && (
          <div
            onClick={() => navigate(`/post/${item._id}`)}
            className="w-[99%] sm:w-[90%] cursor-pointer sm:rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all h-[60vh] sm:h-[70vh] mx-auto "
          >
            <img
              className=" w-full h-full object-cover object-center"
              alt="image content"
              src={item?.image}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-5 w-[90%] mx-auto">
        <div className="flex items-center gap-3">
          <FaHeart size={15} color="#316ff6" />
          <span className="text-sm text-black">
            {item?.likes?.length
              ? `${item?.likes?.length} Likes`
              : "Be the first to Like."}
          </span>
        </div>
        {item.comments.length ? (
          <div className="flex items-center gap-3">
            <MdOutlineChat size={17} color="#316ff6" />
            <span className="text-sm text-black">
              {item.comments.length} comments
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="divider  m-0 p-0 w-[90%] mx-auto"></div>

      {/* like comment */}
      <div className="flex w-[99%] md:w-[90%]  justify-around px-5 mx-auto  items-center ">
        <div className="flex w-full items-center sm:justify-normal sm:gap-5 justify-between">
          {/* <p>50 people likes this.</p> */}
          <div
            onClick={handleLike}
            className="flex cursor-pointer btn border-gray-300 bg-white items-center gap-1 sm:gap-3"
          >
            {like ? (
              <FaHeart size={30} color="#316ff6" />
            ) : (
              <FaRegHeart size={30} color="#316ff6" />
            )}
            <span className="font-semibold text-black ">Like</span>
          </div>
          <div
            onClick={() => navigate(`/post/${item._id}`)}
            className="flex cursor-pointer btn items-center border-gray-300 bg-white gap-1 px-2 sm:gap-3"
          >
            <MdOutlineChat
              className="cursor-pointer"
              size={30}
              color="#316ff6"
            />
            <span className="font-semibold text-black ">Comment</span>
          </div>
        </div>
        <div className=" hidden sm:flex items-center gap-1">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="input input-accent input-md"
            placeholder="write a comment"
          />
          <button
            disabled={loading}
            onClick={handleComment}
            className="btn btn-md btn-primary"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
              </>
            ) : (
              <span>send</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
