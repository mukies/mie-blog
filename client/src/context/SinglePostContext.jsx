/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const SinglePostContext = createContext();

const SinglePostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({});

  const getPost = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/post/single-post/${id}`);
      if (data.success) {
        setPosts(data.post);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SinglePostContext.Provider value={{ posts, loading, getPost, setPosts }}>
      {children}
    </SinglePostContext.Provider>
  );
};

const useGetPost = () => useContext(SinglePostContext);

export { useGetPost, SinglePostProvider };
