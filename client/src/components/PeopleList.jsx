/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PeopleList({ title, action, data }) {
  //   console.log("first", data);
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a8] z-[110] flex justify-center items-center">
      <div className=" h-full w-full md:h-[90%] relative md:w-[80%] lg:w-[50%] flex flex-col gap-1 p-3 rounded-lg bg-white">
        <span className="text-2xl font-semibold text-center capitalize">
          {title} {data.length > 0 && `(${data.length})`}
        </span>
        <span className="divider m-0 p-0"></span>
        {data.length ? (
          data.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(`/profile/${item.username}`);
                action((p) => !p);
              }}
              className="flex flex-col gap-3 border-2 border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-300 duration-200"
            >
              <div className=" flex items-center gap-2 md:gap-5  ">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-400">
                  <img
                    className="  object-cover object-center "
                    src={item.profilePic}
                    alt={item.username}
                  />
                </div>
                <span className="text-xl font-semibold capitalize">
                  {item.fullName}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center">
            {" "}
            <span className="text-2xl font-semibold">
              There is no-one in your {title} list.{" "}
            </span>
          </div>
        )}

        <div
          onClick={() => action((p) => !p)}
          className="btn btn-md btn-circle absolute top-0 right-0"
        >
          <span>
            <FaTimes />
          </span>
        </div>
      </div>
    </div>
  );
}
