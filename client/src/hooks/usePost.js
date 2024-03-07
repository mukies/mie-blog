import axios from "axios";
import { useState } from "react";

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  const addPost = async (text, image) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post/add", { text, image });
      if (data.success) {
        window.location.reload();
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
