import { useEffect, useState } from "react";
import Conversation from "../../components/adminComponent/Conversation";
import { toast } from "react-toastify";
import axios from "axios";

export default function ManageChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      const { data } = await axios.get("/api/message/admin-get-conversation");

      if (data.success) {
        setChats(data.conversations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[768px] mx-auto p-3 flex flex-col gap-5 ">
      {!loading ? (
        <span className="text-xl font-semibold">
          All Conversations ({chats.length})
        </span>
      ) : (
        ""
      )}
      <div
        className={
          loading || !chats.length
            ? "flex justify-center items-center h-[60dvh] "
            : "flex flex-col gap-3"
        }
      >
        {loading ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[222] bg-[#000000c7]">
            <span className="loading loading-spinner text-white scale-125"></span>
          </div>
        ) : !loading && chats.length ? (
          chats.map((chat) => (
            <Conversation key={chat._id} chat={chat} setChats={setChats} />
          ))
        ) : (
          <span className="text-xl font-semibold">
            No conversation created yet.
          </span>
        )}
      </div>
    </div>
  );
}
