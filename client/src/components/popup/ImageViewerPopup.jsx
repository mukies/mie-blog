/* eslint-disable react/prop-types */

import { FaTimes } from "react-icons/fa";

export default function ImageViewerPopup({ img, action }) {
  return (
    <div className=" z-[222] fixed top-0 left-0 right-0 bottom-0 bg-[#000000b6] flex justify-center items-center">
      <div className=" h-[95%] w-[90%] bg-black rounded-lg relative">
        <div
          onClick={() => action(false)}
          className="absolute top-0 right-0 btn btn-md text-[red] btn-circle"
        >
          <span>
            <FaTimes />
          </span>
        </div>
        <img
          className=" object-center object-contain h-full w-full"
          src={img}
          alt="preview image"
        />
      </div>
    </div>
  );
}
