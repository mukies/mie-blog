import { IoSearchOutline } from "react-icons/io5";
import { IoIosChatbubbles, IoMdExit } from "react-icons/io";
import "../../../index.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import SearchUserPopup from "../../adminComponent/SearchUserPopup";
import { useState } from "react";

export default function AdminNav() {
  const navigate = useNavigate();

  const [searchbar, setSearchbar] = useState(false);

  const logout = async () => {
    const { data } = await axios.post("/api/admin/logout");
    if (data.success) {
      localStorage.removeItem("_A");
      window.location.reload();
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="navbar nav-bar sticky top-0 bg-base-300 px-3 sm:px-10 z-[100] ">
      <div className="flex-1 gap-2 sm:gap-4 hidden sm:flex  sm:justify-between  ">
        <Link
          to={"/"}
          className="nav-title cursor-pointer sm:flex relative text-3xl hidden font-bold text-[#316FF6]"
        >
          Mie!
          <span className="text-red-600 absolute bottom-[-50%]  left-[50%] translate-x-[-50%] text-[13px] ">
            Admin
          </span>
        </Link>

        <label
          onClick={() => setSearchbar(true)}
          className="input relative input-bordered p-0  hidden md:w-[70%] md:flex items-center gap-2"
        >
          <input
            type="text"
            className="md:grow h-full w-full  p-[16px]  "
            placeholder="Find a User"
          />
          <IoSearchOutline
            className="cursor-pointer absolute right-[5%]"
            size={25}
          />
        </label>
      </div>
      {searchbar && (
        <div className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000af] ">
          <SearchUserPopup action={setSearchbar} />
        </div>
      )}
      <div className="flex-1  flex justify-start  sm:justify-end gap-5  md:gap-10">
        <div className="flex  flex-none justify-between sm:justify-end w-full sm:gap-4 md:gap-10">
          <span
            onClick={() => navigate("/")}
            className="btn sm:hidden  scale-75 md:scale-100 btn-circle"
          >
            <FaHome size={30} color="#316FF6" />
          </span>
          <span
            onClick={() => navigate("/admin/chats")}
            className="btn  scale-75 md:scale-100 btn-circle"
          >
            <IoIosChatbubbles size={30} color="#316FF6" />
          </span>
          <span
            onClick={() => navigate("/admin/users")}
            className="btn  scale-75 md:scale-100 btn-circle"
          >
            <BsFillPeopleFill size={30} color="#316FF6" />
          </span>
          <span
            onClick={() => setSearchbar(true)}
            className="btn  scale-75 md:scale-100 btn-circle md:hidden"
          >
            <IoSearchOutline size={30} color="#316FF6" />
          </span>
          <span
            onClick={logout}
            className="btn  scale-75 md:scale-100 btn-circle "
          >
            <IoMdExit size={30} color="#316FF6" />
          </span>
        </div>
      </div>
    </div>
  );
}
