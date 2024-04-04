import axios from "axios";
import User from "../../components/adminComponent/User";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-users");

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error while getting users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[768px]  mx-auto p-3 flex flex-col gap-5 ">
      {users && (
        <span className="text-xl font-semibold">
          All users ({users.length})
        </span>
      )}
      <div
        className={
          loading || !users.length
            ? "flex h-[calc(100dvh-150px)] justify-center items-center"
            : "flex flex-col gap-3 min-h-[calc(100dvh-69px)]"
        }
      >
        {loading ? (
          <span className="loading loading-spinner scale-150"></span>
        ) : !loading && users.length ? (
          users.map((user) => (
            <User key={user._id} user={user} setUsers={setUsers} />
          ))
        ) : (
          <span className="text-xl font-semibold">No Users Available</span>
        )}
      </div>
    </div>
  );
}
