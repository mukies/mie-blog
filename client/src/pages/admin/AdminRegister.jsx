/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function AdminRegister() {
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  return (
    <div className=" h-[100dvh] py-5  bg-base-300 flex md:flex-row gap-14 md:gap-20 px-5 flex-col justify-center items-center">
      <div className="md:h-[70%] md:w-[35%] h-auto gap-3 flex justify-center  items-center md:items-start flex-col">
        <h1 className="text-[#316ff6]  font-bold text-5xl">Mie!</h1>
        <p className="w-[20rem] text-center md:text-left  md:w-[20rem] lg:w-[27rem] text-xl lg:text-3xl font-semibold md:px-0 px-3 ">
          Connect with friends and the world around you on Mie!
        </p>
      </div>
      <div className="md:h-[60%] xl:h-[23rem]  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex bg-white rounded-xl flex-col  md:gap-10 gap-5 justify-center items-center  ">
        <p className="text-2xl font-bold">
          Admin Registration to <span className="text-[#316ff6]">Mie!</span>
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-control gap-2 md:h-[70%]  md:w-[60%]"
        >
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="email" className="grow" placeholder="Email" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type={showPass ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            <span>
              {showPass ? (
                <FaEyeSlash
                  className="cursor-pointer "
                  onMouseLeave={() => setShowPass((p) => !p)}
                  size={22}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onMouseEnter={() => setShowPass((p) => !p)}
                  size={20}
                />
              )}
            </span>
          </label>

          <button
            onClick={() => setShow((p) => !p)}
            className="btn bg-[#316FF6] hover:bg-[#283e6b] text-white font-semibold"
          >
            Register
          </button>
          <p>
            Already have an account ?{" "}
            <Link
              to="/mie-admin"
              className="cursor-pointer text-[#316ff6] font-bold"
            >
              Login
            </Link>{" "}
          </p>
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
              <button className="btn btn-sm btn-success text-white">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
