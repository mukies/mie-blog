/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchPage({ action }) {
  const inputRef = useRef();

  useEffect(() => {
    const data = setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
    return () => clearTimeout(data);
  }, []);

  return (
    <div className="overflow-auto h-full w-full md:h-[90%] p-3 md:w-[80%] lg:w-[50%] md:rounded-lg bg-white relative ">
      <div
        onClick={() => action((p) => !p)}
        className="sticky top-0 right-0 btn btn-md btn-circle"
      >
        <span>
          <FaTimes />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="  ">
          <span className="text-3xl block text-center font-semibold mb-5 ">
            Search People
          </span>
          <label className="input  border-2 border-[#316ff6a9] mx-auto flex w-[70%]  items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              className="grow  "
              placeholder="Find a friend"
            />
            <IoSearchOutline
              onClick={() => alert()}
              className=" rounded-full bg-[#316ff6] text-white hover:bg-[#3d5ea7] duration-200 font-bold cursor-pointer  p-2"
              size={40}
            />
          </label>
          <span className="divider m-0 p-0"></span>
        </div>
        <div className="flex  flex-col gap-3  rounded-lg p-2 ">
          <span className="text-xl font-semibold text-center">
            Search Result
          </span>
          <div className="flex flex-col gap-3 ">
            {/* person 1  */}
            <div className=" border-[1px] border-gray-300 rounded-lg p-2 hover:bg-gray-300 duration-200 cursor-pointer flex items-center gap-2 md:gap-5  ">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-400">
                <img
                  className="  object-cover object-center "
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="user-image"
                />
              </div>
              <span className="text-xl font-semibold capitalize">
                Mukesh bhattarai
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
