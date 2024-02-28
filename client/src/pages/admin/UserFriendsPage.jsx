import User from "../../components/adminComponent/User";
import AdminLayout from "../../components/layout/admin/AdminLayout";

export default function UserFriendsPage() {
  return (
    <AdminLayout>
      <div className="max-w-[768px] mx-auto p-3 flex flex-col gap-5 ">
        <span className="text-xl font-semibold">All users (50)</span>
        <User />
        <User />
        <User />
        <User />
      </div>
    </AdminLayout>
  );
}
