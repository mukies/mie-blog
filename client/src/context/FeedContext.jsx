/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";

const FeedContext = createContext();

const FeedProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getFeedPost = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/api/post/feed");
      if (data.success) {
        setPosts(data.feedPost);
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
    <FeedContext.Provider value={{ posts, loading, getFeedPost, setPosts }}>
      {children}
    </FeedContext.Provider>
  );
};

const useFeed = () => useContext(FeedContext);

export { useFeed, FeedProvider };
