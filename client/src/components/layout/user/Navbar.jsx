/* eslint-disable react-hooks/exhaustive-deps */
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import "../../../index.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useUserDetails from "../../../hooks/useUserDetails";
import { useEffect, useState } from "react";
import SearchPage from "../../popup/SearchPage";
import { FaHome } from "react-icons/fa";

export default function Nav() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { getUserDetails, loading, user } = useUserDetails();
  const { pathname } = useLocation();
  // search bar popup
  const [searchbar, setSearchbar] = useState(false);
  const isInTheChatPage = pathname.startsWith("/chats/@");
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("_L");
    localStorage.removeItem("_N");
    await axios.post("/api/user/logout");
    navigate("/");
    window.location.reload();
  };

  // const { getUserDetails, loading, user } = useUserDetails();
  useEffect(() => {
    getUserDetails(auth?.username);
  }, [auth?.username]);

  return (
    <div
      className={
        isInTheChatPage
          ? " nav-bar bg-white sm:flex hidden sticky top-0 px-1 sm:px-10 z-[99]"
          : " nav-bar bg-white sticky top-0 px-1 sm:px-10 z-[99]"
      }
    >
      {!loading && !user?.username && (
        <div className="fixed overflow-hidden top-0 left-0 bottom-0 right-0 flex justify-center items-center z-[222] bg-black">
          <div className="bg-white flex flex-col p-5 gap-3 rounded-xl ">
            <p className="text-xs sm:text-sm md:text-lg font-semibold ">
              Something went wrong.<br></br> Try logging in later.
            </p>
            <button
              onClick={logout}
              className="btn btn-secondary btn-sm max-w-max "
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {!loading && user.isFrozen ? (
        <div className="fixed overflow-hidden top-0 left-0 bottom-0 right-0 flex justify-center items-center z-[222] bg-black">
          <div className="bg-white flex flex-col p-5 gap-3 rounded-xl ">
            <p className="text-xs sm:text-sm md:text-lg font-semibold ">
              You&apos;r account has been temporarily disabled, due to unusual
              activity.<br></br> Try logging in later.
            </p>
            <button
              onClick={logout}
              className="btn btn-secondary btn-sm max-w-max "
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar ">
          {" "}
          <div className="flex-1 gap-4 hidden sm:flex md:justify-between  ">
            <span
              onClick={() => navigate("/")}
              className="nav-title cursor-pointer text-2xl sm:text-3xl font-bold text-[#316FF6]"
            >
              Mie!
            </span>

            <label
              onClick={() => setSearchbar((p) => !p)}
              className="input relative input-bordered p-0  hidden md:w-[70%] md:flex items-center gap-2"
            >
              <input
                type="text"
                maxLength={10}
                className="md:grow h-full w-full  p-[16px] "
                placeholder="Search People..."
              />
              <IoSearchOutline
                onClick={() => setSearchbar(true)}
                className="cursor-pointer absolute right-[5%]"
                size={25}
              />
            </label>
          </div>
          {searchbar && (
            <div className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000af] ">
              <SearchPage action={setSearchbar} />
            </div>
          )}
          <div className="sm:flex-1 w-full sm:justify-end gap-5 flex  justify-between md:gap-10">
            <div className="flex sm:flex-none flex-auto justify-between gap-2 md:gap-10">
              <span
                onClick={() => {
                  navigate("/");
                }}
                className="btn sm:hidden bg-white border-gray-200 scale-90 md:scale-100 btn-circle"
              >
                <FaHome size={30} color="#316FF6" />
              </span>
              <span
                onClick={() => {
                  navigate("/chats");
                }}
                className="btn bg-white border-gray-200 scale-90 md:scale-100 btn-circle"
              >
                <IoChatbubbleEllipsesSharp size={30} color="#316FF6" />
              </span>
              <span
                onClick={() => navigate("/user-suggestion")}
                className="btn bg-white border-gray-200 scale-90 md:scale-100 btn-circle"
              >
                <BsFillPeopleFill size={30} color="#316FF6" />
              </span>
              <span
                onClick={() => setSearchbar(true)}
                className="btn btn-md bg-white border-gray-200 scale-90 flex justify-center items-center  btn-circle md:hidden"
              >
                <IoSearchOutline size={30} color="#316FF6" />
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle  avatar"
              >
                <div className=" h-9 w-9  sm:w-10 sm:h-10 flex justify-center items-center rounded-full">
                  {user && !loading ? (
                    <img alt={user?.username} src={user?.profilePic} />
                  ) : (
                    <span className="loading loading-spinner "></span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] bg-gray-100 p-2 shadow menu menu-sm dropdown-content rounded-box w-52"
              >
                <li
                  onClick={() => {
                    const elem = document.activeElement;
                    if (elem) {
                      elem?.blur();
                    }
                    navigate(`/profile/${auth?.username}`);
                  }}
                >
                  <a className="justify-between">Profile</a>
                </li>

                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
