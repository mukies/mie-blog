import { useEffect, useState } from "react";
import UserPost from "../../components/adminComponent/UserPost";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    getProfilePost();
  }, []);

  const getProfilePost = async () => {
    try {
      const { data } = await axios.get(`/api/post/all`);
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
    <div className="max-w-[768px] mx-auto ">
      {postLoading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[97] flex justify-center items-center">
          <span className="loading loading-spinner scale-125"></span>
        </div>
      ) : (
        <div
          className={
            posts.length
              ? "flex flex-col gap-3"
              : "flex justify-center items-center h-[calc(100dvh-69px)]"
          }
        >
          {posts.length ? (
            posts.map((post) => (
              <UserPost key={post._id} post={post} setPosts={setPosts} />
            ))
          ) : (
            <span className="text-xl font-semibold">
              User did&apos;t have any post.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
