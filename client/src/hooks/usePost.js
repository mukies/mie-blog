import axios from "axios";
import { useState } from "react";
import { useFeed } from "../context/FeedContext";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const { setPosts } = useFeed();

  const addPost = async (text, image) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post/add", { text, image });
      if (data.success) {
        // window.location.reload();
        setPosts((p) => [data.post, ...p]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { addPost, loading };
};
