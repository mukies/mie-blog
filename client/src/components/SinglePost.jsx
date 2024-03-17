/* eslint-disable react/prop-types */
import Comment from "./Comment";
import { MdOutlineChat } from "react-icons/md";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";
import { useGetPost } from "../context/SinglePostContext";
import ImageViewerPopup from "./popup/ImageViewerPopup";
import { useNavigate } from "react-router-dom";
import Popup from "./popup/Popup";

export default function SinglePost() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { posts, setPosts } = useGetPost();
  const [text, setText] = useState("");
  const [like, setLike] = useState(posts?.likes?.includes(auth?._id));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [viewImg, setViewImg] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const commentRef = useRef();
  // for like the post
  const handleLike = async () => {
    if (!auth) return alert("Login first");
    if (posts?.likes?.includes(auth?._id)) {
      setPosts({
        ...posts,
        likes: posts?.likes?.filter((id) => id !== auth._id),
      });
    } else {
      setPosts({ ...posts, likes: [...posts.likes, auth._id] });
    }
    setLike((p) => !p);
    await axios.put(`/api/post/like-unlike/${posts._id}`);
  };

  // for adding a comment
  const handleComment = async () => {
    if (!auth) {
      alert("Please login first.");
    } else {
      if (text) {
        setLoading(true);
        try {
          const { data } = await axios.post(
            `/api/post/add-comment/${posts?._id}`,
            {
              text,
            }
          );
          if (data.success) {
            await setPosts({
              ...posts,
              comments: [...posts.comments, { topic: "new comment added" }],
            });

            setText("");
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // for delete post
  const handleDelete = async () => {
    const { data } = await axios.delete(
      `/api/post/user-delete-post/${posts._id}`
    );
    if (data.success) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-[768px] mx-auto flex flex-col gap-3 py-3">
      {auth && (
        <div className=" sticky z-10  top-[70px] ">
          <button
            onClick={() => history.back()}
            className="btn  btn-sm btn-outline text-[#316ff6]"
          >
            back
          </button>
        </div>
      )}
      <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
        <div className=" flex flex-col gap-5">
          {/* title  */}
          <div className="flex items-center gap-4  justify-between ">
            <div className="flex items-center">
              <div className="w-10 h-10 flex justify-center items-center overflow-hidden rounded-full">
                {posts.postedBy ? (
                  <img alt="user-profile" src={posts.postedBy?.profilePic} />
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="text-xl font-semibold">
                  {posts?.postedBy?.fullName}
                </h1>
                <span className="text-gray-700">Just now</span>
              </div>
            </div>

            {posts?.postedBy?._id == auth?._id && (
              <div
                onClick={() => setShowDelete(true)}
                className=" btn btn-circle"
              >
                <span>
                  <FaTrash color="red" />
                </span>
              </div>
            )}
            {showDelete && (
              <Popup handleDelete={handleDelete} cancel={setShowDelete} />
            )}
          </div>

          {/* text content  */}
          <div className="w-[90%] rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all  mx-auto">
            <p className="">{posts?.text}</p>
          </div>
          {/* image content  */}
          {posts?.image && (
            <div
              onClick={() => setViewImg(true)}
              className="w-[99%] cursor-pointer rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all h-[70vh] mx-auto "
            >
              <img
                className=" w-full h-full object-cover object-center"
                alt="Tailwind CSS Navbar component"
                src={posts?.image}
              />
            </div>
          )}
          {viewImg && (
            <ImageViewerPopup img={posts?.image} action={setViewImg} />
          )}
        </div>
        <div className="flex items-center gap-5 w-[90%] mx-auto">
          <div className="flex items-center gap-3">
            <FaHeart size={15} color="#316ff6" />
            <span>{posts?.likes?.length} likes</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineChat size={17} color="#316ff6" />
            <span>{posts?.comments?.length} comments</span>
          </div>
        </div>
        <div className="divider m-0 p-0 w-[90%] mx-auto"></div>

        {/* like comment */}

        <div className="flex w-[99%] md:w-[90%] justify-around px-5 mx-auto  items-center ">
          <div className="flex w-full items-center gap-[50px]">
            {/* <p>50 people likes this.</p> */}
            <div
              onClick={handleLike}
              className="flex btn cursor-pointer items-center gap-3"
            >
              {like ? (
                <FaHeart size={30} color="#316ff6" />
              ) : (
                <FaRegHeart size={30} color="#316ff6" />
              )}
              <span className="font-semibold ">Like</span>
            </div>
            <div
              onClick={() => {
                commentRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex cursor-pointer btn items-center gap-3"
            >
              <MdOutlineChat
                className="cursor-pointer"
                size={30}
                color="#316ff6"
              />
              <span className="font-semibold ">Comment</span>
            </div>
            <div className=" hidden md:flex items-center gap-1">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span>send</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <span className="text-2xl font-semibold border-b-2 border-red-400 inline-block">
        Comments
      </span>
      {/* comments  */}
      <div ref={commentRef} className="flex mt-4 flex-col gap-5">
        {posts?.comments?.length ? (
          posts?.comments?.map((item, id) => (
            <Comment
              key={id}
              index={id}
              commentId={item._id}
              postId={posts._id}
              item={item}
            />
          ))
        ) : (
          <div className="h-[10dvh] flex justify-center items-center">
            {" "}
            <span>Be the first to comment.</span>
          </div>
        )}
      </div>
    </div>
  );
}
