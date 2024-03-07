/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRegister } from "../hooks/useRegister.js";

export default function Register({ setRegister }) {
  // hooks call for register
  const { register, loading } = useRegister();

  // states for form input
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [gender, setGender] = useState(null);

  // form submit
  const handleSubmit = () => {
    if (!fullName || !username || !email || !password || !confirm || !gender) {
      alert("fill all the fields.");
    } else {
      if (password == confirm) {
        register(fullName, username, email, password, gender, setRegister);
      } else {
        alert("password didn't match");
      }
    }
  };

  return (
    <div className="md:h-[70%] relative lg:h-[80%] h-auto  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex   bg-white rounded-xl flex-col  md:gap-7 gap-5 justify-center items-center  ">
      <div
        onClick={() => setRegister((p) => !p)}
        className="absolute top-[3px] right-[3px] bg-[#316ff6] rounded-lg md:p-1"
      >
        <span>
          <FaTimes
            className="scale-75 md:scale-100 text-white cursor-pointer"
            size={30}
          />
        </span>
      </div>
      <p className="text-3xl font-bold">
        Register to <span className="text-[#316ff6]">Mie!</span>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="form-control gap-2 md:h-[80%] w-[90%] md:w-[80%]"
      >
        <label className="input input-bordered flex items-center gap-2">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="grow"
            placeholder="Full Name"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="grow"
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="grow"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            className="grow"
            placeholder="Confirm Password"
          />
        </label>
        <div className="flex gap-4">
          <label className=" flex gap-2 items-center cursor-pointer">
            <span className="font-semibold text-sm">Male</span>
            <input
              type="radio"
              name="radio-10"
              className="radio border-[#316ff6] checked:bg-[#316ff6]"
              onChange={() => setGender("male")}
              checked={gender == "male"}
            />
          </label>
          <label className=" flex gap-2 items-center cursor-pointer">
            <span className="font-semibold text-sm">Female</span>

            <input
              onChange={() => setGender("female")}
              checked={gender == "female"}
              type="radio"
              name="radio-10"
              className="radio border-[#316ff6] checked:bg-[#316ff6]"
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="btn mt-3 btn-md bg-[#316FF6] hover:bg-[#283e6b] text-white font-semibold"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
            </>
          ) : (
            <span>Sign up</span>
          )}
        </button>
      </form>
    </div>
  );
}
