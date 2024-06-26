import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHome() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [err, setErr] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    if (!passwordLoading) {
      if (!password.length || !confirmPassword.length) {
        setErr(true);
        toast.error("All the fields are required.");
        setErr(true);
        return;
      }
      if (password !== confirmPassword) {
        setErr(true);
        toast.error("Passwords do not match.");
        setErr(true);
        return;
      }

      setPasswordLoading(true);
      try {
        const { data } = await axios.put("/api/admin/change-password", {
          password,
          confirmPassword,
        });
        if (data.success) {
          toast.success(data.message);
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setPasswordLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[768px] mx-auto py-5 flex flex-col gap-6 ">
        <div className="hero  bg-gray-100 rounded-xl p-3">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div className="flex items-center justify-center md:items-start flex-col gap-3">
              <h1 className="text-2xl sm:text-5xl  font-bold">
                Welcome to{" "}
                <span className="text-[#316ff6] text-center">Mie!</span>
              </h1>
              <h1 className="text-3xl font-bold text-red-600 selection:bg-red-500 selection:text-white">
                Admin Panel
              </h1>
              <p className="sm:py-6 py-1 ">
                This is the Admin Panel of{" "}
                <span className="text-[#316ff6] font-semibold text-xl">
                  Mie!
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        {/* form  */}
        <div className="hero sm:min-h-[100vh] min-h-[60vh] bg-white rounded-xl">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-5xl font-bold my-0 sm:my-3">
                Change Password!
              </h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gray-100">
              <form className="card-body ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      New Password<span className="text-[red]">*</span>
                    </span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="password"
                    className="input input-info bg-gray-100"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Confirm Password<span className="text-[red]">*</span>
                    </span>
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="text"
                    placeholder="re-password"
                    className="input input-info bg-gray-100"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={changePassword}
                    className="btn btn-primary text-white capitalize"
                  >
                    {passwordLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <span>save</span>
                    )}
                  </button>
                </div>
                {err ? (
                  <span className="text-sm text-center text-[red]">
                    Form validation error.
                  </span>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
        {/* form  */}
        <div className="bg-gray-100 flex sm:flex-row flex-col gap-3 justify-around items-center rounded-xl p-3">
          <div className="h-[350px] w-[300px] sm:w-auto  border border-gray-400 p-2 sm:p-0 rounded-md flex-1  flex flex-col items-center gap-3">
            <div
              onClick={() => navigate("/admin/users")}
              className=" h-[80%] flex items-center overflow-hidden rounded-md cursor-pointer"
            >
              <img
                src="/user.png"
                alt="users-icon"
                className="object-cover object-center sm:hover:scale-105 duration-150 h-[85%] w-full"
              />
            </div>
            <div>
              <Link
                to={"/admin/users"}
                className="btn btn-md btn-outline text-black"
              >
                Manage Users
              </Link>
            </div>
          </div>
          <div className="h-[350px] w-[300px] sm:w-full border border-gray-400 p-2 sm:p-0 rounded-md  flex-1 flex flex-col items-center gap-3">
            <div
              onClick={() => navigate("/admin/chats")}
              className=" h-[80%] overflow-hidden flex items-center rounded-md cursor-pointer "
            >
              <img
                src="/chat.png"
                alt="chats-icon"
                className="object-cover mix-blend-multiply object-center sm:hover:scale-[130%] scale-[120%] duration-150 h-full w-auto"
              />
            </div>
            <div>
              <Link
                to={"/admin/chats"}
                className="btn btn-md btn-outline text-black"
              >
                Manage Chats
              </Link>
            </div>
          </div>
          <div className="h-[350px] w-[300px] sm:w-auto border p-2 sm:p-0 border-gray-400 rounded-md flex-1 flex flex-col items-center gap-3">
            <div
              onClick={() => navigate("/admin/news-feed")}
              className=" h-[80%] flex items-center overflow-hidden rounded-md cursor-pointer "
            >
              <img
                src="/News-Feed.jpg"
                alt="news-feed-icon"
                className="object-cover mix-blend-multiply object-left sm:hover:scale-[105%]   duration-150 h-[80%] w-full"
              />
            </div>
            <div>
              <Link
                to={"/admin/news-feed"}
                className="btn btn-md btn-outline text-black"
              >
                News Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
