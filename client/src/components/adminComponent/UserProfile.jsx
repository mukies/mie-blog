export default function UserProfile() {
  return (
    <div>
      <div className="flex flex-col ">
        {/* cover and profile  */}
        <div className="relative h-[400px]  w-full">
          <img
            className="h-[70%] object-cover object-center w-full"
            src="/cover.jpg"
            alt="cover-image"
          />
          <div className="absolute flex flex-col items-center  translate-x-[-50%] translate-y-[-50%] left-[50%] top-[70%]">
            <img
              className="  h-[170px] w-[170px] rounded-full border-[5px] border-white  object-cover object-center"
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            <div className=" flex flex-col items-center">
              <h1 className="text-2xl text-nowrap md:text-3xl font-bold">
                mukesh Bhattarai
              </h1>
              <span className="text-xl text-gray-600 font-semibold">
                50 friends
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
