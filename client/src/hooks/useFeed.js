import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getFeedPost = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/api/post/feed");
      if (data.success) {
        setPosts(data.feedPost);
      } else {
        toast.error("error while fetching feed post.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getFeedPost, loading, posts, setPosts };
};
