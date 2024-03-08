/* eslint-disable react/prop-types */
import Comment from "./Comment";
import { MdOutlineChat } from "react-icons/md";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";

export default function SinglePost({ posts: post }) {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [posts, setPosts] = useState(post);

  const [like, setLike] = useState(posts.likes.includes(auth?._id));

  const handleLike = async () => {
    if (!auth) return alert("Login first");
    if (posts.likes.includes(auth?._id)) {
      setPosts({
        ...posts,
        likes: posts.likes.filter((id) => id !== auth._id),
      });
    } else {
      setPosts({ ...posts, likes: [...posts.likes, auth._id] });
    }
    setLike((p) => !p);
    await axios.put(`/api/post/like-unlike/${posts._id}`);
  };
  const commentRef = useRef();
  return (
    <div className="max-w-[768px] mx-auto flex flex-col gap-3 py-3">
      <div className=" sticky  top-[70px] ">
        <button
          onClick={() => history.back()}
          className="btn  btn-sm btn-outline text-[#316ff6]"
        >
          back
        </button>
      </div>
      <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-4 py-5 ">
        <div className=" flex flex-col gap-5">
          {/* title  */}
          <div className="flex items-center gap-4  relative">
            <div className="w-10 overflow-hidden rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-semibold">
                {posts?.postedBy?.fullName}
              </h1>
              <span className="text-gray-700">Just now</span>
            </div>
            {posts.postedBy._id == auth?._id && (
              <div className="absolute btn btn-circle right-0 top-[50%] translate-y-[-50%]">
                <span>
                  <FaTrash color="red" />
                </span>
              </div>
            )}
          </div>

          {/* text content  */}
          <div className="w-[90%] rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all  mx-auto">
            <p className="">{posts?.text}</p>
          </div>
          {/* image content  */}
          <div className="w-[99%] rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all h-[70vh] mx-auto ">
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
            <span>{posts?.likes?.length} likes</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineChat size={17} color="#316ff6" />
            <span>{posts.comments.length} comments</span>
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
                type="text"
                className="input input-accent input-md"
                placeholder="write a comment"
              />
              <button className="btn btn-md btn-primary">
                <span>send</span>
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
        {posts.comments.length ? (
          posts.comments.map((item, id) => (
            <Comment key={id} commentId={id} postId={posts._id} item={item} />
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
