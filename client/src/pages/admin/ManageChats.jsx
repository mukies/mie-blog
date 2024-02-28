import Conversation from "../../components/adminComponent/Conversation";
import AdminLayout from "../../components/layout/admin/AdminLayout";

export default function ManageChats() {
  return (
    <AdminLayout>
      <div className="max-w-[768px] mx-auto p-3 flex flex-col gap-5 ">
        <span className="text-xl font-semibold">All Conversations (50)</span>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </AdminLayout>
  );
}
