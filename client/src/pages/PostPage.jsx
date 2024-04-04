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
        <div className="fixed top-0 left-0 right-0 z-[97] bottom-0 bg-white flex justify-center items-center">
          <span className="loading loading-spinner scale-150 "></span>
        </div>
      ) : (
        <SinglePost />
      )}
    </div>
  );
}
