/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getProfilePost = async (username) => {
    try {
      const { data } = await axios.get(`/api/post/profile-post/${username}`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error("error while fetching feed post.");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProfileContext.Provider
      value={{ getProfilePost, posts, setPosts, loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfilePost = () => useContext(ProfileContext);

export { useProfilePost, ProfileContextProvider };
