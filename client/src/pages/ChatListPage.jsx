import { useNavigate } from "react-router-dom";

export default function ChatListPage() {
  const navigate = useNavigate();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 8];
  return (
    <div className="max-w-[768px] py-5  mx-auto">
      <div className="bg-[#316ff6] rounded-lg h-[60px] flex justify-center items-center text-white ">
        <span className="text-2xl font-semibold">Conversations</span>
      </div>
      <div className=" flex flex-col gap-2 px-1 py-3">
        {/* first conversation */}
        {data.map((i, id) => (
          <div
            onClick={() => navigate(`/chats/${i}`)}
            key={id}
            className="flex gap-5 cursor-pointer hover:bg-gray-300 border-2 border-gray-300 p-2 rounded-lg items-center"
          >
            <div className=" relative flex justify-center items-center rounded-full border-[2px] border-white">
              <img
                className="h-14 w-14 rounded-full"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user-profile"
              />
              <div className="absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full bg-[green]"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Mukesh bhattarai</span>
              <span className="capitalize text-gray-500 text-lg">
                tab to open {i}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
