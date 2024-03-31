/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchUserPopup({ action }) {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [key, setKey] = useState("");
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
    return () => clearTimeout(data);
  }, []);

  const handleSearch = async () => {
    if (key.length == 0) {
      setUsers(null);
    }
    if (key) {
      setLoading(true);

      try {
        const { data } = await axios.get(`/api/admin/admin-search-user/${key}`);
        if (data.success) {
          setUsers(data.users);
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

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
              value={key}
              onChange={(e) => setKey(e.target.value)}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              className="grow  "
              placeholder="Find a friend"
            />
            <IoSearchOutline
              onClick={handleSearch}
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
          <div
            className={
              loading || !users?.length
                ? "flex h-[30dvh] justify-center items-center "
                : "flex flex-col gap-3 "
            }
          >
            {/* person 1  */}
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : !loading && users?.length == 0 ? (
              <span className="text-xl font-semibold">No User Found.</span>
            ) : (
              users?.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    navigate(`/admin/users/${item.username}`);
                    action((p) => !p);
                  }}
                  className=" border-[1px] border-gray-300 rounded-lg p-2 hover:bg-gray-300 duration-200 cursor-pointer flex items-center gap-2 md:gap-5  "
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-400">
                    <img
                      className=" h-full w-full object-cover object-center "
                      src={item.profilePic}
                      alt="user-image"
                    />
                  </div>
                  <span className="text-xl font-semibold capitalize">
                    {item.fullName}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
