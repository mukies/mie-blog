import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function MessagePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-[768px] h-[calc(100dvh-66px)]   mx-auto">
      <div className="bg-gray-300 relative rounded-t-lg h-[60px] px-2 flex  items-center text-black">
        <div className="absolute top-[25%] left-[10px]">
          <button
            onClick={() => navigate("/chats")}
            className="btn  btn-sm bg-[#316ff6] hover:bg-[#375492] duration-200 text-white"
          >
            back
          </button>
        </div>
        <div className=" flex  items-center gap-3 px-5 justify-around mx-auto w-[50%]">
          <span className="text-xl font-semibold">To:</span>
          <p className="text-2xl text-nowrap font-semibold">
            {" "}
            <span>Mukesh Bhattarai</span>{" "}
            <span className="text-lg text-[green] capitalize">(online)</span>
          </p>
        </div>
      </div>
      <div className="border-l-2 border-b-2 rounded-b-md border-r-2 border-gray-300 flex flex-col gap-2 h-[calc(100%-120px)] p-3 overflow-auto ">
        <Message />
      </div>
      <div className=" px-5 rounded-b-lg h-[60px] gap-2 flex justify-center items-center">
        <label className="input input-success w-full h-full flex items-center gap-2">
          <input type="text" className="grow" placeholder="Type a message..." />
        </label>
        <button className="btn btn-success text-white">send</button>
      </div>
    </div>
  );
}
