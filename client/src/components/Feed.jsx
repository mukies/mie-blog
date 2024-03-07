import { useEffect } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { useFeed } from "../hooks/useFeed";
import PostLoading from "./loading/PostLoading";

export default function Feed() {
  // call feed post hooks
  const { getFeedPost, loading, posts } = useFeed();

  useEffect(() => {
    getFeedPost();
  }, []);

  return (
    <div className=" ">
      <div>
        <CreatePost />
        <div className="divider m-0 p-0"></div>
        <div className="flex flex-col mb-3 gap-5">
          {loading ? (
            <PostLoading />
          ) : posts?.length ? (
            posts.map((item, id) => <Post key={id} item={item} />)
          ) : (
            <div>
              {" "}
              <p>Follow some people to view some posts.</p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
