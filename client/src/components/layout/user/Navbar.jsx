/* eslint-disable react-hooks/exhaustive-deps */
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import "../../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../../hooks/useUserDetails";
import { useEffect, useState } from "react";
import SearchPage from "../../popup/SearchPage";

export default function Nav() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const { getUserDetails, loading, user } = useUserDetails();
  // search bar popup
  const [searchbar, setSearchbar] = useState(false);

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
    <div className="navbar nav-bar sticky top-0 bg-base-300 px-10 z-[99] ">
      <div className="flex-1 gap-4 md:justify-between  ">
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
            onClick={() => setSearchbar((p) => !p)}
            className="cursor-pointer absolute right-[5%]"
            size={25}
          />
        </label>
        {searchbar && (
          <div className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000af] ">
            <SearchPage action={setSearchbar} />
          </div>
        )}
      </div>
      <div className="flex-1 justify-end gap-5  md:gap-10">
        <div className="flex flex-none  gap-2 md:gap-10">
          <span
            onClick={() => {
              navigate("/chats");
            }}
            className="btn  scale-75 md:scale-100 btn-circle"
          >
            <IoChatbubbleEllipsesSharp size={30} color="#316FF6" />
          </span>
          <span
            onClick={() => navigate("/user-suggestion")}
            className="btn hidden sm:flex scale-75 md:scale-100 btn-circle"
          >
            <BsFillPeopleFill size={30} color="#316FF6" />
          </span>
          <span
            onClick={() => setSearchbar((p) => !p)}
            className="btn btn-md scale-75 flex justify-center items-center  btn-circle md:hidden"
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
            <div className="w-10 h-10 flex justify-center items-center rounded-full">
              {user && !loading ? (
                <img alt={user?.username} src={user?.profilePic} />
              ) : (
                <span className="loading loading-spinner "></span>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
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
            <li
              onClick={() => {
                const elem = document.activeElement;
                if (elem) {
                  elem?.blur();
                }
                navigate("/user-suggestion");
              }}
              className="sm:hidden"
            >
              <a>Friends Suggestion</a>
            </li>

            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
