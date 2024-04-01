import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import { useGetPost } from "../context/SinglePostContext";

export default function PostPage() {
  // const auth = JSON.parse(localStorage.getItem("_L"));

  const { id } = useParams();
  const { getPost, posts, loading } = useGetPost();

  useEffect(() => {
    getPost(id);
  }, [posts?.comments?.length]);

  return (
    <div>
      {loading ? (
        <div className="flex h-[calc(100dvh-65px)] items-center justify-center">
          {" "}
          <span className="loading scale-150 loading-spinner"></span>{" "}
        </div>
      ) : (
        <SinglePost />
      )}
    </div>
  );
}
