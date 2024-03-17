import axios from "axios";
import { useState } from "react";
import { useFeed } from "../context/FeedContext";
import { useProfilePost } from "../context/ProfilePost";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const { setPosts } = useFeed();
  const { setPosts: setPost } = useProfilePost();

  const addPost = async (text, image) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post/add", { text, image });
      if (data.success) {
        // window.location.reload();
        setPosts((p) => [...p, data.post]);
        setPost((p) => [...p, data.post]);
      } else {
        alert(data.message);
      }
      // console.log("text", text);
      // console.log("image", image);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { addPost, loading };
};
