import axios from "axios";
import { useState } from "react";

export default function useUserDetails() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const getUserDetails = async (username) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/${username}`);
      if (data.success) {
        setUser(data.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getUserDetails, loading, user };
}