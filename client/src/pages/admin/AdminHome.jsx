import Nav from "../../components/adminComponent/Nav";

export default function AdminHome() {
  return (
    <div className="w-full">
      <Nav />
      <div className="max-w-[768px] mx-auto py-5 flex flex-col gap-6 ">
        <div className="hero  bg-base-200 rounded-xl p-3">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div className="flex items-center md:items-start flex-col gap-3">
              <h1 className="text-5xl font-bold">
                Welcome to <span className="text-[#316ff6]">Mie!</span>
              </h1>
              <h1 className="text-3xl font-bold text-red-600 selection:bg-red-500 selection:text-white">
                Admin Panel
              </h1>
              <p className="py-6 ">
                This is the Admin Panel of{" "}
                <span className="text-[#316ff6] font-semibold text-xl">
                  Mie!
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-200 flex md:flex-row flex-col justify-around items-center rounded-xl p-3">
          <div className="h-[350px] flex flex-col items-center gap-3">
            <div className=" h-[80%] overflow-hidden rounded-md cursor-pointer">
              <img
                src="/user.png"
                alt="users-icon"
                className="object-cover object-center hover:scale-[100%] scale-[90%] duration-150 h-full w-auto"
              />
            </div>
            <div>
              <button className="btn btn-md btn-outline">Manage Users</button>
            </div>
          </div>
          <div className="h-[350px] flex flex-col items-center gap-3">
            <div className=" h-[80%] overflow-hidden rounded-md cursor-pointer ">
              <img
                src="/chat.png"
                alt="chats-icon"
                className="object-cover mix-blend-multiply object-center hover:scale-[130%] scale-[120%] duration-150 h-full w-auto"
              />
            </div>
            <div>
              <button className="btn btn-md btn-outline">Manage Chats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
