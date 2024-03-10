/* eslint-disable react/prop-types */
export default function Popup({ text, handleDelete, cancel }) {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-[100] flex justify-center items-center bg-[#000000b0]">
      <div className=" bg-white flex  justify-center  gap-4 flex-col rounded-lg px-5  py-3">
        <span className="text-center">{text}</span>
        <div className="flex w-full justify-between gap-3 items-center ">
          <button onClick={() => cancel(false)} className="btn btn-success">
            cancel
          </button>
          <button
            onClick={() => {
              handleDelete();
              cancel(false);
            }}
            className="btn btn-error"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
