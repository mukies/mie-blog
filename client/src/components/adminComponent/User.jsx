import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className="flex justify-between items-center p-2 rounded-lg border-2 border-gray-400">
      <div className="flex items-center gap-3">
        <div className="h-[80px] relative w-[80px] rounded-full ">
          <img
            className="object-cover rounded-full object-center"
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
          <div className="absolute h-[20px] w-[20px] rounded-full bg-green-600 border-[3px] border-white top-0 right-0"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold ">Mukesh Bhattarai</h1>
          <span className="text-lg text-gray-600">created at: 2024 jan 12</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <button
            onClick={() => navigate("/admin/users/mukesh")}
            className="btn btn-outline btn-sm"
          >
            details
          </button>
        </div>
        <div role="button" tabIndex={0} className="dropdown dropdown-end">
          <button className="btn btn-sm  hover:bg-red-900 bg-red-600 text-white">
            <FaTrashCan />
          </button>
          {/* dropdown  */}
          <div
            tabIndex={0}
            className="dropdown-content z-10 mt-5 text-black w-auto p-5 bg-white rounded-lg border-2 border-[#316ff6]"
          >
            <div className="flex flex-col items-center gap-5">
              <span>Are you sure ?</span>
              <div className="flex items-center gap-3">
                <div>
                  <button className="btn btn-sm btn-error">delete</button>
                </div>
                <div>
                  <button onClick={handleClick} className="btn btn-sm btn-info">
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
