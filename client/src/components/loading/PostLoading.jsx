export default function PostLoading() {
  return (
    <div className="flex justify-center max-w-[768px] mx-auto ">
      <div className="flex flex-col gap-4 w-full ">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col w-full gap-4">
            <div className="skeleton h-4 w-[50%]"></div>
            <div className="skeleton h-4 w-[30%]"></div>
          </div>
        </div>
        <div className="skeleton h-60 w-full"></div>
      </div>
    </div>
  );
}
