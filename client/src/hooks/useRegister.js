import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const register = async (fullName, username, email, password, gender) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        fullName,
        username,
        email,
        password,
        gender,
      });
      if (data.success) {
        console.log(data.message);
        const loginData = await axios.post("/api/user/login", {
          username: email,
          password,
        });

        console.log(loginData);
        if (loginData.data.success) {
          localStorage.setItem("_L", JSON.stringify(loginData.data.data));
          window.location.reload();
          //   navigate("/");
        } else {
          toast.error(loginData.data.message);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};
