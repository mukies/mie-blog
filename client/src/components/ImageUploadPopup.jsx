/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";

export default function ImageUploadPopup({ setPopup, photo, setPhoto, title }) {
  return (
    <div className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex  justify-center items-center bg-[#000000af] ">
      <div className="  h-full w-full md:h-auto  flex flex-col gap-5 p-5 md:w-[80%] lg:w-[50%] md:rounded-lg bg-white relative ">
        <div
          onClick={() => setPopup((p) => !p)}
          className="absolute top-0 right-0 btn btn-md btn-circle"
        >
          <span>
            <FaTimes />
          </span>
        </div>
        <span className="text-2xl font-semibold text-center">
          Upload new {title} Picture.
        </span>
        <div className="flex h-full justify-center flex-col gap-5 items-center">
          <div>
            <input
              onChange={(e) => setPhoto(e.target.files[0])}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
          {photo && (
            <div className=" relative mx-auto">
              <img
                className="h-[200px] w-[200px] object-cover object-center"
                src={URL.createObjectURL(photo)}
                alt="photo"
              />
              <div
                onClick={() => setPhoto(null)}
                className="absolute top-0 right-0 btn btn-circle btn-sm"
              >
                <span>
                  <FaTimes color="red" />
                </span>
              </div>
            </div>
          )}

          <button
            disabled={!photo}
            className="btn w-[60%] btn-success font-bold"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
