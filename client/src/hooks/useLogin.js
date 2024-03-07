import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", {
        username,
        password,
      });
      console.log(data);

      if (data.success) {
        localStorage.setItem("_L", JSON.stringify(data.data));
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
  return { login, loading };
};
