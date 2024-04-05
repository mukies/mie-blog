/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "../../index.css";

export default function AdminRegister() {
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!loading) {
      try {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
          toast.error("Please fill all the fields");
          setShow((p) => !p);
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setShow((p) => !p);
          return;
        }

        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          setShow((p) => !p);
          return;
        }

        const { data } = await axios.post("/api/admin/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          const { data: loginData } = await axios.post("/api/admin/login", {
            email,
            password,
          });

          if (loginData.success) {
            localStorage.setItem("_A", JSON.stringify(loginData.user));
            window.location.href = "/";
          } else {
            toast.error(loginData.message);
          }
        } else {
          toast.error(data.message);
          setShow((p) => !p);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" admin h-[100dvh] w-full bg-base-300 flex md:flex-row gap-14 md:gap-20 p-5 flex-col justify-center items-center">
      <div className="md:h-[60%] xl:h-[23rem]  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex bg-[#ffffffa8] rounded-xl flex-col  md:gap-10 gap-5 justify-center items-center  ">
        <p className="text-2xl font-bold">
          <span className="text-[red]">Admin</span> Registration to{" "}
          <span className="text-[#316ff6]">Mie!</span>
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-control gap-2 md:h-[70%]  md:w-[60%]"
        >
          <label className="input input-accent bg-gray-100 flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="grow placeholder:text-gray-500"
              placeholder="Fullname"
            />
          </label>
          <label className="input input-accent bg-gray-100 flex items-center gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="grow placeholder:text-gray-500"
              placeholder="Email"
            />
          </label>

          <label className="input input-accent bg-gray-100 flex items-center gap-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              className="grow placeholder:text-gray-500"
              placeholder="Password"
            />
          </label>
          <label className="input input-accent bg-gray-100 flex items-center gap-2">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              className="grow placeholder:text-gray-500"
              placeholder="Confirm Password"
            />
            <span>
              {showPass ? (
                <FaEyeSlash
                  className="cursor-pointer "
                  onClick={() => setShowPass((p) => !p)}
                  size={22}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onClick={() => setShowPass((p) => !p)}
                  size={20}
                />
              )}
            </span>
          </label>

          <button
            onClick={() => setShow((p) => !p)}
            className="btn bg-[#316FF6] border-none hover:bg-[#283e6b] text-white font-semibold"
          >
            Register
          </button>
        </form>
      </div>
      <div
        className={
          show
            ? `fixed flex justify-center p-5  items-center top-0 left-0 right-0 bottom-0 bg-[#0000009a]`
            : `fixed justify-center hidden p-5 items-center top-0 left-0 right-0 bottom-0 bg-[#0000009a]`
        }
      >
        <div className="flex flex-col p-4 items-center bg-white  rounded-lg gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Are you sure ?</span>
            <span className="text-lg max-w-[380px]">
              Once you've Register, you are not able to Register again with any
              other Email.
            </span>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <button
                onClick={() => setShow((p) => !p)}
                className="btn btn-sm btn-outline"
              >
                cancel
              </button>
            </div>
            <div>
              <button
                onClick={handleRegister}
                className="btn btn-sm btn-success text-white"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
