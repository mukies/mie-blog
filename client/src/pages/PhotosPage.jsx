import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageViewerPopup from "../components/popup/ImageViewerPopup";
import { useProfilePost } from "../context/ProfilePost";
// import { FaTimes } from "react-icons/fa";

export default function PhotosPage() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const navigate = useNavigate();
  const [showPic, setShowPic] = useState(false);

  // hooks
  const { getProfilePost, loading, posts } = useProfilePost();

  useEffect(() => {
    getProfilePost(auth?.username);
  }, []);

  return (
    <div className=" max-w-[768px] mx-auto min-h-[calc(100dvh-65px)] border-[1px] border-[#316ff6]">
      <div className="sticky top-[65px] z-[222] bg-[#316dd6] p-4 justify-between items-center flex">
        <button
          onClick={() => navigate(`/profile/${auth?.username}`)}
          className=" btn btn-sm btn-outline btn-active "
        >
          back
        </button>
        <span className="text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-white">
          Your Photos
        </span>
      </div>
      <div
        className={
          loading || !posts.length
            ? " h-[calc(100dvh-150px)] flex justify-center items-center"
            : " p-1 grid grid-cols-3 md:grid-cols-3 box-border gap-1 w-full"
        }
      >
        {loading ? (
          <span className="loading loading-spinner scale-150"></span>
        ) : posts.length ? (
          posts
            .filter((p) => p.image !== null)
            .map((post) => (
              <div key={post._id}>
                <div
                  onClick={() => setShowPic(true)}
                  className=" h-[200px] sm:h-[250px] md:h-[300px]  min-w-[100px] md:min-w-[185px] bg-gray-500 cursor-pointer rounded-md overflow-hidden"
                >
                  <img
                    className="h-full w-full object-cover object-center hover:scale-105 duration-300"
                    src={post.image}
                    alt="image-content"
                  />
                </div>

                {showPic && (
                  <ImageViewerPopup action={setShowPic} img={post.image} />
                )}
              </div>
            ))
        ) : !posts.length ? (
          <span className="text-xl font-semibold">No Image Available</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
