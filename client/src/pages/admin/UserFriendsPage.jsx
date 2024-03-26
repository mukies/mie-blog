import User from "../../components/adminComponent/User";

export default function UserFriendsPage() {
  return (
    <div className="max-w-[768px] mx-auto p-3 flex flex-col gap-5 ">
      <span className="text-xl font-semibold">All users (50)</span>
      <User />
      <User />
      <User />
      <User />
    </div>
  );
}
