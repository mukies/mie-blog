import Conversation from "../../components/adminComponent/Conversation";

export default function ManageChats() {
  return (
    <div className="max-w-[768px] mx-auto p-3 flex flex-col gap-5 ">
      <span className="text-xl font-semibold">All Conversations (50)</span>
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}
