// import { useEffect } from "react";
// import useUserDetails from "../hooks/useUserDetails";

import { useState } from "react";
import ImageViewerPopup from "./popup/ImageViewerPopup";

/* eslint-disable react/prop-types */
export default function Message({
  msg,
  otherUser,
  loginUser,
  userLoading: loading,
}) {
  const auth = JSON.parse(localStorage.getItem("_L"));

  const [viewImg, setViewImg] = useState(false);

  return (
    // if my message className = 'flex-row-reverse'
    <div
      className={
        msg.senderID == auth._id ? "flex flex-row-reverse gap-5" : "flex  gap-5"
      }
    >
      <div className="flex items-center flex-col gap-0">
        <div className="h-10 w-10 flex justify-center items-center rounded-full overflow-hidden">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <img
              className=" h-full w-full object-center object-cover"
              src={
                msg.senderID == auth._id
                  ? loginUser?.profilePic
                  : otherUser.profilePic
              }
              alt="profile-pic"
            />
          )}
        </div>
        <span className="text-sm text-center text-nowrap">just now</span>
      </div>
      <div className="flex flex-col gap-3 max-w-[40%] ">
        {/* if my message classname = rounded-br-none bg-blue-700 */}
        {msg.text && (
          <div
            className={
              msg.senderID == auth._id
                ? "p-2 text-white rounded-lg rounded-br-none bg-blue-700"
                : "p-2 text-white rounded-lg rounded-tl-none bg-gray-700 "
            }
          >
            <p className="max-w-max  text-[17px] leading-[23px]">{msg.text}</p>
          </div>
        )}
        {msg.image && (
          <div
            onClick={() => setViewImg(true)}
            className="h-[60dvh] cursor-pointer rounded-md overflow-hidden w-full "
          >
            <img
              className=" h-full w-full object-center object-cover"
              src={msg.image}
              alt="image-content"
            />
          </div>
        )}
        {viewImg && <ImageViewerPopup action={setViewImg} img={msg?.image} />}
      </div>
    </div>
  );
}
