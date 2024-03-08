import { useState } from "react";
import axios from "axios";

export const useProfilePost = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getProfilePost = async (id) => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/api/post/profile-post/${id}`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        alert("error while fetching feed post.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getProfilePost, loading, posts, setPosts };
};
