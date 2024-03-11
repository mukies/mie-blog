/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useFeed } from "../context/FeedContext";
import { useProfilePost } from "../context/ProfilePost";

export default function Post({ item: items, id }) {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [item, setItem] = useState(items);
  const [like, setLike] = useState(item.likes.includes(auth._id));
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const text = item.text;
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setPosts, loading: feedLoding } = useFeed();
  const { setPosts: setPost } = useProfilePost();

  // like and unlike
  const handleLike = async () => {
    if (item.likes.includes(auth._id)) {
      setItem({ ...item, likes: item.likes.filter((id) => id !== auth._id) });
    } else {
      setItem({ ...item, likes: [...item.likes, auth._id] });
    }
    setLike((p) => !p);
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
    console.log(item._id);
    const { data } = await axios.delete(
      `/api/post/user-delete-post/${item._id}`
    );
    if (data.success) {
      setPosts((p) => p.filter((i, index) => index != id));
      setPost((p) => p.filter((i, index) => index != id));
    }
  };

  return (
    <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
      {/* content  */}
      <div className=" flex flex-col gap-5 ">
        {/* title  */}
        <div className="flex  px-3 items-center justify-between">
          <div className=" flex items-center gap-4">
            <div
              onClick={() => navigate(`/profile/${item.postedBy.username}`)}
              className="w-10 h-10 flex justify-center items-center overflow-hidden cursor-pointer rounded-full"
            >
              {item || !feedLoding ? (
                <img
                  alt={item.postedBy?.username}
                  src={item.postedBy?.profilePic}
                />
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-semibold">
                {item.postedBy.fullName}
              </h1>
              <span className="text-gray-700">Just now</span>
            </div>
          </div>
          {item.postedBy._id == auth?._id && (
            <div
              onClick={() => setShowPopup((p) => !p)}
              className=" btn btn-circle "
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
        <div className="w-[90%] bg-gray-200 p-3 rounded-md overflow-hidden md:w-[80%] duration-200 transition-all  mx-auto">
          <p className="">
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
        {/* image content  */}
        {!item.image && (
          <div
            onClick={() => navigate(`/post/${item._id}`)}
            className="w-[90%] cursor-pointer rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all h-[70vh] mx-auto "
          >
            <img
              className=" w-full h-full object-cover object-center"
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-5 w-[90%] mx-auto">
        <div className="flex items-center gap-3">
          <FaHeart size={15} color="#316ff6" />
          <span className="text-sm">
            {item.likes.length
              ? `${item.likes.length} Likes`
              : "Be the first to Like."}
          </span>
        </div>
        {item.comments.length ? (
          <div className="flex items-center gap-3">
            <MdOutlineChat size={17} color="#316ff6" />
            <span className="text-sm">{item.comments.length} comments</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="divider m-0 p-0 w-[90%] mx-auto"></div>

      {/* like comment */}
      <div className="flex w-[99%] md:w-[90%] justify-around px-5 mx-auto  items-center ">
        <div className="flex w-full items-center gap-[50px]">
          {/* <p>50 people likes this.</p> */}
          <div
            onClick={handleLike}
            className="flex cursor-pointer btn  items-center gap-3"
          >
            {like || item.likes.includes(auth._id) ? (
              <FaHeart size={30} color="#316ff6" />
            ) : (
              <FaRegHeart size={30} color="#316ff6" />
            )}
            <span className="font-semibold ">Like</span>
          </div>
          <div
            onClick={() => navigate(`/post/${item._id}`)}
            className="flex cursor-pointer btn items-center gap-3"
          >
            <MdOutlineChat
              className="cursor-pointer"
              size={30}
              color="#316ff6"
            />
            <span className="font-semibold ">Comment</span>
          </div>
        </div>
        <div className=" hidden md:flex items-center gap-1">
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
