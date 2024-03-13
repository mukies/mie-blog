export default function Message() {
  return (
    // if my message className = 'flex-row-reverse'
    <div className="flex  gap-5">
      <div className="flex  flex-col gap-0">
        <img
          className=" h-14 w-14 rounded-full object-center object-cover"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="image-content"
        />
        <span className="text-sm text-center text-nowrap">just now</span>
      </div>
      <div className="flex flex-col gap-3 max-w-[40%] ">
        {/* if my message classname = rounded-br-none bg-blue-700 */}
        <div className="p-2 text-white rounded-lg rounded-tl-none bg-gray-700 ">
          <p className="max-w-max  text-[17px] leading-[23px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ne
          </p>
        </div>
        <div className="h-[60dvh] rounded-md overflow-hidden w-full ">
          <img
            className=" h-full w-full object-center object-cover"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="image-content"
          />
        </div>
      </div>
    </div>
  );
}
