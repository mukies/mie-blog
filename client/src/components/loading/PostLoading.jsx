export default function PostLoading() {
  return (
    <div className="py-5">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-52 w-full"></div>
      </div>
    </div>
  );
}
