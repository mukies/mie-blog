import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className=" h-auto md:h-[100dvh] py-5  bg-base-300 flex md:flex-row gap-14 md:gap-20 px-5 flex-col justify-center items-center">
      <div className="md:h-[70%] md:w-[35%] h-auto gap-3 flex justify-center  items-center md:items-start flex-col">
        <h1 className="text-[#316ff6]  font-bold text-5xl">Mie!</h1>
        <p className="w-[20rem] text-center md:text-left  md:w-[20rem] lg:w-[27rem] text-xl lg:text-3xl font-semibold md:px-0 px-3 ">
          Connect with friends and the world around you on Mie!
        </p>
      </div>
      <div className="md:h-[70%] lg:h-[80%] h-auto  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex   bg-white rounded-xl flex-col  md:gap-7 gap-5 justify-center items-center  ">
        <p className="text-3xl font-bold">
          Register to <span className="text-[#316ff6]">Mie!</span>
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-control gap-2 md:h-[80%] w-[90%] md:w-[60%]"
        >
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Full Name" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="email" className="grow" placeholder="Email" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input type="password" className="grow" placeholder="Password" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
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
                className="radio checked:bg-red-500"
                checked
              />
            </label>
            <label className=" flex gap-2 items-center cursor-pointer">
              <span className="font-semibold text-sm">Female</span>

              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                checked
              />
            </label>
          </div>

          <button className="btn bg-[#316FF6] hover:bg-[#283e6b] text-white font-semibold">
            Sign up
          </button>
          <p>
            Already have an account ?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-[#316ff6] font-bold"
            >
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
