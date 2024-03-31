import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageViewerPopup from "../../components/popup/ImageViewerPopup";
import { toast } from "react-toastify";
import axios from "axios";
// import { FaTimes } from "react-icons/fa";

export default function UserPhotoPage() {
  const navigate = useNavigate();
  const [showPic, setShowPic] = useState(null);
  const { username } = useParams();
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // hooks
  useEffect(() => {
    getProfilePost();
  }, [username]);
  const getProfilePost = async () => {
    try {
      const { data } = await axios.get(
        `/api/post/admin-profile-post/${username}`
      );
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error("error while fetching feed post.");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className=" max-w-[768px] mx-auto min-h-[calc(100dvh-65px)] border-[1px] border-[#316ff6]">
      {postLoading ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center bg-[#000000d6] items-center z-[222] ">
          <span className="loading loading-spinner scale-125 text-white"></span>
        </div>
      ) : (
        <div>
          <div className="sticky top-[65px] z-[222] bg-[#316dd6] p-4 justify-between items-center flex">
            <button
              onClick={() => navigate(`/admin/users/${username}`)}
              className=" btn btn-sm btn-outline btn-active "
            >
              back
            </button>
            <span className="text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-white">
              Photos
            </span>
          </div>
          <div
            className={
              !posts.length
                ? " h-[calc(100dvh-150px)] flex justify-center items-center"
                : " p-1 grid grid-cols-3 md:grid-cols-3 box-border gap-1 w-full"
            }
          >
            {posts.length ? (
              posts
                .filter((p) => p.image !== null)
                .map((post) => (
                  <div key={post._id}>
                    <div
                      onClick={() => setShowPic(post.image)}
                      className=" h-[200px] sm:h-[250px] md:h-[300px]  min-w-[100px] md:min-w-[185px] bg-gray-500 cursor-pointer rounded-md overflow-hidden"
                    >
                      <img
                        className="h-full w-full object-cover object-center hover:scale-105 duration-300"
                        src={post.image}
                        alt="image-content"
                      />
                    </div>

                    {showPic && (
                      <ImageViewerPopup action={setShowPic} img={showPic} />
                    )}
                  </div>
                ))
            ) : (
              <span className="text-xl font-semibold">No Image Available</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
