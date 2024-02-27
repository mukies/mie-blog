import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className=" h-[100dvh] py-5  bg-base-300 flex md:flex-row gap-14 md:gap-20 px-5 flex-col justify-center items-center">
      <div className="md:h-[70%] md:w-[35%] h-auto gap-3 flex justify-center  items-center md:items-start flex-col">
        <h1 className="text-[#316ff6]  font-bold text-5xl">Mie!</h1>
        <p className="w-[20rem] text-center md:text-left  md:w-[20rem] lg:w-[27rem] text-xl lg:text-3xl font-semibold md:px-0 px-3 ">
          Connect with friends and the world around you on Mie!
        </p>
      </div>
      <div className="md:h-[60%]  py-4 w-[19rem] sm:w-[22rem] md:w-[25rem] flex bg-white rounded-xl flex-col justify-center items-center  ">
        <p className="text-3xl font-bold">404 Error.</p>
        <p className="text-2xl font-bold">Page not Found.</p>
        <div className=" flex items-center gap-3 mt-4">
          <span className="text-lg font-semibold">go to</span>
          <Link to={"/"} className="btn btn-sm btn-outline">
            home
          </Link>
        </div>
      </div>
    </div>
  );
}
