/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Register from "./Register";
import { useLogin } from "../hooks/useLogin";
import "../index.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [register, setRegister] = useState(false);
  // form states for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // login hooks
  const { login, loading } = useLogin();

  const handleLogin = () => {
    if (!loading) {
      if (!username || !password) {
        setErr(true);
        toast.error("enter username and password to login.");
      } else {
        login(username, password);
      }
    }
  };

  return (
    <div className=" admin h-[100dvh] py-5  bg-base-300 flex md:flex-row gap-14 md:gap-20 px-5 flex-col justify-center items-center">
      <div className="md:h-[70%] md:w-[35%] h-auto gap-3 flex justify-center  items-center md:items-start flex-col">
        <mark className="text-white bg-[#316ff6] p-1 rounded-lg font-bold text-5xl ">
          Mie!
        </mark>
        <p className="w-[20rem] text-center md:text-left text-white md:w-[20rem] lg:w-[27rem] text-xl lg:text-3xl font-semibold md:px-0 px-3 ">
          Connect with friends and the world around you on Mie!
        </p>
      </div>
      <div className="md:h-[60%]  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex bg-[#ffffffa8] rounded-xl flex-col  md:gap-10 gap-5 justify-center items-center  ">
        <p className="text-3xl font-bold">
          Login to <span className="text-[#316ff6]">Mie!</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form-control gap-2 md:h-[70%]  md:w-[60%]"
        >
          <label className="input input-bordered bg-gray-100 flex items-center gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="grow"
              placeholder="Username or Email"
            />
          </label>

          <label className="input input-bordered bg-gray-100 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 hidden sm:flex"
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
              type={showPass ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            <span>
              {showPass ? (
                <FaEyeSlash
                  className="min-w-max cursor-pointer "
                  onClick={() => setShowPass((p) => !p)}
                  size={22}
                />
              ) : (
                <FaEye
                  className="min-w-max cursor-pointer"
                  onClick={() => setShowPass((p) => !p)}
                  size={20}
                />
              )}
            </span>
          </label>
          {err && (
            <span className="text-sm text-center text-[red]">
              Username and Password is Required.
            </span>
          )}
          <button
            onClick={handleLogin}
            className="btn bg-[#316FF6] border-none hover:bg-[#283e6b] text-white font-semibold"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
          <p>
            Didn't have an account ?{" "}
            <button
              onClick={() => setRegister((p) => !p)}
              className="cursor-pointer text-[#316ff6] font-bold"
            >
              Sign Up
            </button>{" "}
          </p>
        </form>
      </div>
      <div
        className={
          register
            ? "fixed bg-[#000000be] top-0 left-0 right-0 bottom-0 flex  justify-center items-center"
            : "fixed top-0 left-0 right-0 bottom-0 hidden justify-center items-center"
        }
      >
        <div>
          <Register setRegister={setRegister} />
        </div>
      </div>
    </div>
  );
}
