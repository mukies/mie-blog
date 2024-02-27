import { IoSearchOutline } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import "../../index.css";
import { BsFillPeopleFill } from "react-icons/bs";
// import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar nav-bar sticky top-0 bg-base-300 px-10 z-[100] ">
      <div className="flex-1 gap-4 md:justify-between  ">
        <span className="nav-title cursor-pointer text-3xl font-bold text-[#316FF6]">
          Mie!
        </span>

        <label className="input input-bordered hidden md:w-[70%] md:flex items-center gap-2">
          <input
            type="text"
            className="md:grow  "
            placeholder="Find a friend"
          />
          <IoSearchOutline className="cursor-pointer" size={25} />
        </label>
      </div>
      <div className="flex-1 justify-end gap-5  md:gap-10">
        <div className="flex  flex-none  gap-4 md:gap-10">
          <span className="btn md:flex hidden btn-circle">
            <IoIosChatbubbles size={30} color="#316FF6" />
          </span>
          <span className="btn md:flex hidden btn-circle">
            <BsFillPeopleFill size={30} color="#316FF6" />
          </span>
          <span className="btn btn-md  flex justify-center items-center  btn-circle md:hidden">
            <IoSearchOutline size={30} color="#316FF6" />
          </span>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle  avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
          >
            <li className="md:hidden">
              <a className="justify-between">Chats Manager</a>
            </li>
            <li className="md:hidden">
              <a className="justify-between">Users Manager</a>
            </li>
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}