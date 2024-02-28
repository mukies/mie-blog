import UserProfile from "../../adminComponent/UserProfile";
import AdminLayout from "./AdminLayout";
import UserPost from "../../adminComponent/UserPost";
import { FaUserFriends } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="max-w-[768px] mx-auto">
        <div>
          <UserProfile />
          <span className="text-2xl font-semibold">Contact Info</span>
          <div>
            <p className="text-xl font-semibold">
              Email:{" "}
              <span className="font-normal text-gray-700">
                muk.yess@gmail.com
              </span>
            </p>
          </div>
        </div>

        <div className="divider mx-auto"></div>
        <div className="bg-gray-300  mx-auto rounded-lg p-2 flex justify-around ">
          <p
            onClick={() => navigate("/admin/users/friend-list")}
            className=" flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer"
          >
            <FaUserFriends />{" "}
            <span className="text-xl font-semibold">All Friends</span>
          </p>
          <p className=" flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer">
            <MdPermMedia />{" "}
            <span className="text-xl font-semibold">All Photos</span>
          </p>
        </div>

        <div className="divider mx-auto"></div>

        {/* posts  */}

        <div className="flex flex-col  gap-3">
          <span className="text-2xl font-semibold">Posts</span>
          <UserPost />
          <UserPost />
          <UserPost />
        </div>
        {/* post  */}
      </div>
    </AdminLayout>
  );
}
