import { FaHeart, FaTrash } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import ImageViewerPopup from "../../components/popup/ImageViewerPopup";
import Popup from "../../components/popup/Popup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminCommentSection from "../../components/adminComponent/AdminCommentSection";
import { useNavigate, useParams } from "react-router-dom";
import FriendListPopup from "../../components/adminComponent/FriendListPopup";
import { timeAgo } from "../../helper/dateFormater";

export default function SinglePostPage() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [viewImg, setViewImg] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const commentRef = useRef();
  const [likeListPopup, setLikeListPopup] = useState(false);

  useEffect(() => {
    getPost();
  }, [postID]);

  const handleDelete = async () => {
    if (!deleteLoading) {
      try {
        const { data } = await axios.delete(
          `/api/post/admin-delete-post/${postID}`
        );
        if (data.success) {
          navigate(`/admin/users/${post.postedBy.username}`);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/post/admin-single-post/${postID}`);
      if (data.success) {
        setPost(data.post);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  return (
    <div>
      {initialLoading ? (
        <div className="fixed top-0 left-0 right-0 z-[97] bottom-0 bg-white flex justify-center items-center">
          <span className="loading loading-spinner scale-150 "></span>
        </div>
      ) : (
        <div className="max-w-[768px] mx-auto flex flex-col gap-3 py-3">
          <div className=" sticky z-10  top-[70px] ">
            <button
              onClick={() => history.back()}
              className="btn btn-sm btn-outline btn-active text-white"
            >
              back
            </button>
          </div>

          <div className=" flex flex-col gap-3 border-2 rounded-xl bg-white w-full px-1 sm:px-4 py-5 ">
            <div className=" flex flex-col gap-5">
              {/* title  */}
              <div className="flex items-center gap-4  justify-between ">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 flex justify-center items-center overflow-hidden rounded-full">
                    <img
                      className="h-full w-full object-center object-cover"
                      alt="user-profile"
                      src={post.postedBy?.profilePic}
                    />
                  </div>
                  <div className="flex flex-col gap-0">
                    <h1 className="text-xl font-semibold">
                      {post.postedBy?.fullName}
                    </h1>
                    <span className="text-gray-700">
                      {timeAgo(new Date(post?.createdAt))}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setShowDelete(true)}
                  className=" btn btn-circle"
                >
                  <span>
                    <FaTrash color="red" />
                  </span>
                </div>

                {showDelete && (
                  <Popup handleDelete={handleDelete} cancel={setShowDelete} />
                )}
              </div>

              {/* text content  */}
              {post?.text && (
                <div className="w-[90%] rounded-2xl p-2 sm:p-3 overflow-hidden md:w-[80%] duration-200 transition-all  mx-auto">
                  <p className="">{post?.text}</p>
                </div>
              )}
              {/* image content  */}
              {post?.image && (
                <div
                  onClick={() => setViewImg(true)}
                  className="w-[99%] cursor-pointer sm:rounded-2xl overflow-hidden md:w-[80%] duration-200 transition-all h-[70vh] mx-auto "
                >
                  <img
                    className=" w-full h-full object-cover object-center"
                    alt="Tailwind CSS Navbar component"
                    src={post?.image}
                  />
                </div>
              )}
              {viewImg && (
                <ImageViewerPopup img={post?.image} action={setViewImg} />
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
              <div
                ref={commentRef}
                onClick={() => {
                  commentRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex cursor-pointer items-center gap-3"
              >
                <MdOutlineChat size={17} color="#316ff6" />
                <span>{post?.comments?.length} comments</span>
              </div>
            </div>
            {likeListPopup && (
              <FriendListPopup
                title={"likes"}
                data={post?.likes}
                action={setLikeListPopup}
              />
            )}
            <div className="divider m-0 p-0 w-[90%] mx-auto"></div>
          </div>
          <span className="text-2xl font-semibold border-b-2 border-red-400 inline-block">
            Comments
          </span>

          {/* comments  */}
          <div ref={commentRef} className="flex mt-4 flex-col gap-5">
            {post?.comments?.length ? (
              post?.comments?.map((comment) => (
                <AdminCommentSection
                  key={comment._id}
                  postId={post._id}
                  comment={comment}
                  setPost={setPost}
                  post={post}
                />
              ))
            ) : (
              <div className="h-[10dvh] flex justify-center items-center">
                {" "}
                <span>No comment yet.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
