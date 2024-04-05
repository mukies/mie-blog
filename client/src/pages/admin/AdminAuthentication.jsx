import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";

export const AdminAuthentication = () => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem("_L"));
  const adminAuth = JSON.parse(localStorage.getItem("_A"));
  const navigate = useNavigate();

  useEffect(() => {
    if (auth || adminAuth) {
      navigate("/");
    }

    const checkRegistration = async () => {
      try {
        const { data } = await axios.get("/api/admin/registration-check");
        if (data.success) {
          setAdmin(data.isRegister);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkRegistration();
  }, []);
  return (
    <div
      className={
        loading
          ? "flex justify-center bg-white items-center min-h-[100dvh]"
          : "flex justify-center bg-white items-center min-h-[100dvh] "
      }
    >
      {loading ? (
        <span className="loading loading-spinner scale-125"></span>
      ) : !loading && admin ? (
        <AdminLogin />
      ) : (
        <AdminRegister />
      )}
    </div>
  );
};
