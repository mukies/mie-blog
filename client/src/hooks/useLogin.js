import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("_L", JSON.stringify(data.data));
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};
