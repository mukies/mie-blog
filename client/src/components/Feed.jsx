import { useEffect } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { useFeed } from "../context/FeedContext";
import { FaPeopleGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const navigate = useNavigate();

  // call feed post hooks
  const { getFeedPost, loading, posts } = useFeed();

  useEffect(() => {
    getFeedPost();
  }, [posts.length]);

  return (
    <div className={!posts.length ? "h-[calc(100dvh-69px)]" : ""}>
      <div>
        <CreatePost />
        <div className="divider m-0 p-0"></div>
        <div className="flex flex-col mb-3 gap-5">
          {loading ? (
            <div className="fixed top-0 left-0 right-0 z-[98] bottom-0 bg-white flex justify-center items-center">
              <span className="loading loading-spinner scale-150 "></span>
            </div>
          ) : posts?.length ? (
            posts?.map((item, id) => <Post key={id} id={id} item={item} />)
          ) : (
            <div className="h-[40dvh] flex justify-center items-center flex-col gap-3">
              <p className="text-xl font-semibold ">
                Follow some people to view their posts.
              </p>
              <button
                onClick={() => navigate("/user-suggestion")}
                className="btn btn-info flex items-center text-white"
              >
                <span>
                  <FaPeopleGroup />
                </span>
                <span>Find a friend</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
