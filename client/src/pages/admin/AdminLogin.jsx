/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../../index.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loading) {
      try {
        setLoading(true);
        if (!email || !password) {
          toast.error("Please fill all the fields");
          return;
        }

        const { data } = await axios.post("/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("_A", JSON.stringify(data.user));
          window.location.href = "/";
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className=" admin h-[100dvh] w-full bg-cover bg-center py-5  flex md:flex-row gap-14 md:gap-20 px-5 flex-col justify-center items-center">
      <div className="md:h-[60%] xl:h-[20rem]  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex bg-[#ffffffa8] rounded-xl flex-col  md:gap-10 gap-5 justify-center items-center  ">
        <p className="text-2xl font-bold">
          <span className="text-[red]">Admin</span> Login to{" "}
          <span className="text-[#316ff6]">Mie!</span>
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-control gap-2 md:h-[70%]  md:w-[60%]"
        >
          <label className="input  input-accent bg-gray-100 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="grow placeholder:text-gray-500 "
              placeholder="Email"
            />
          </label>

          <label className="input input-accent bg-gray-100 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="grow placeholder:text-gray-500"
              placeholder="Password"
            />
          </label>

          <button
            onClick={handleLogin}
            className="btn bg-[#316FF6] border-none hover:bg-[#283e6b] text-white font-semibold"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
