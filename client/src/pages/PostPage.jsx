import { useEffect, useState } from "react";
import Layout from "../components/layout/user/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePost from "../components/SinglePost";

export default function PostPage() {
  // const auth = JSON.parse(localStorage.getItem("_L"));

  const { id } = useParams();
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/post/${id}`);
        if (data.success) {
          setPosts(data.post);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <div className="flex h-[30dvh] items-center justify-center">
          {" "}
          <span className="loading scale-150 loading-spinner"></span>{" "}
        </div>
      ) : (
        <SinglePost posts={posts} />
      )}
    </Layout>
  );
}
