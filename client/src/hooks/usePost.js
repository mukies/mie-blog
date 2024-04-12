import axios from "axios";
import { useState } from "react";
import { useFeed } from "../context/FeedContext";
import { toast } from "react-toastify";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const { setPosts } = useFeed();

  const addPost = async (text, image) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post/add", { text, image });
      if (data.success) {
        // window.location.reload();
        setPosts((p) => [...p, data.post]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { addPost, loading };
};
