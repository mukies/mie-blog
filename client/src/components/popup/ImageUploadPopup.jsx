/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import usePreviewImg from "../../hooks/usePreviewImg";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ImageUploadPopup({ setPopup, title }) {
  const [loading, setLoading] = useState(false);
  // hooks
  const { previewImg, imgUrl, setImgUrl } = usePreviewImg();

  const imageUpload = async () => {
    setLoading(true);
    try {
      if (title == "Profile") {
        const { data } = await axios.put("/api/user/change-profile-and-cover", {
          profilePic: imgUrl,
        });
        if (data.success) {
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.put("/api/user/change-profile-and-cover", {
          coverPic: imgUrl,
        });
        if (data.success) {
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

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
              onChange={previewImg}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
          {imgUrl && (
            <div className=" relative mx-auto">
              <img
                className="h-[200px] w-[200px] object-cover object-center"
                src={imgUrl}
                alt="photo"
              />
              <div
                onClick={() => setImgUrl(null)}
                className="absolute top-0 right-0 btn btn-circle btn-sm"
              >
                <span>
                  <FaTimes color="red" />
                </span>
              </div>
            </div>
          )}

          <button
            onClick={imageUpload}
            disabled={!imgUrl || loading}
            className="btn w-[60%] btn-success font-bold"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
