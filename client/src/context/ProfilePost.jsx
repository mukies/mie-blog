/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
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
