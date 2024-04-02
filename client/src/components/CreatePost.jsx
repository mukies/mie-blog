import { MdPermMedia } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import { toast } from "react-toastify";
import usePreviewImg from "../hooks/usePreviewImg";

export default function CreatePost() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const postRef = useRef();

  const { getUserDetails, loading: userLoading, user } = useUserDetails();

  // preview image hook
  const { previewImg, imgUrl, setImgUrl } = usePreviewImg();
  // add post hook
  const { loading, addPost } = usePost();

  useEffect(() => {
    getUserDetails(auth?.username);
  }, [auth?.username]);

  const handlePost = async () => {
    if (!text && !imgUrl) {
      toast.error("Nothing to post");
    } else {
      await addPost(text, imgUrl);
      setShow(false);
      setText("");
    }
  };

  return (
    <div className=" flex py-2  justify-center rounded-3xl flex-col gap-2  ">
      <div className="flex bg-white w-full max-w-[550px] rounded-2xl mx-auto px-2 justify-between  gap-3  py-2 md:p-5 items-center">
        <div
          onClick={() => navigate(`/profile/${user?.username}`)}
          className="w-[50px] h-[50px] bg-gray-200 rounded-full flex justify-center items-center overflow-hidden cursor-pointer "
        >
          {userLoading ? (
            <div className="fixed top-0 left-0 right-0 z-[98] bottom-0 bg-white flex justify-center items-center">
              <span className="loading loading-spinner scale-150 "></span>
            </div>
          ) : (
            <img
              alt={user?.username}
              className=" object-cover object-center w-full h-full"
              src={user?.profilePic}
            />
          )}
        </div>
        <div
          onClick={() => {
            setShow((p) => !p);
            setTimeout(() => {
              postRef.current.focus();
            }, 1);
          }}
          className="flex-1"
        >
          <input
            type="text"
            placeholder="What's on your mind..."
            className="input w-full mx-auto bg-gray-200 input-md  rounded-3xl"
          />
        </div>
        <div
          onClick={() => {
            setShow((p) => !p);
            setTimeout(() => {
              postRef.current.focus();
            }, 1);
          }}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3"
        >
          <MdPermMedia size={30} color="#316ff6" />
        </div>
      </div>

      <div
        className={
          show
            ? "fixed top-0 left-0 right-0 bottom-0 flex z-[100] justify-center items-center bg-[#000000b4]"
            : "fixed top-0 left-0 right-0 bottom-0 hidden z-[100] justify-center items-center bg-[#000000b4]"
        }
      >
        <div className="bg-white relative md:rounded-lg justify-center items-center  p-3 flex h-auto w-full md:h-auto md:w-[60%]  lg:w-[50%] flex-col ">
          <div
            onClick={() => setShow((p) => !p)}
            className="absolute btn btn-circle top-[2px] cursor-pointer right-[2px]"
          >
            <span>
              <FaTimes size={28} color="#316ff6" />
            </span>
          </div>
          <div className="flex flex-col w-full gap-2">
            <span className="text-center text-3xl font-semibold">
              Create a post
            </span>
            <span className="divider p-0 m-0"></span>
            {/* user name and image  */}
            <div className=" flex mb-2 items-center gap-3">
              <img
                className="h-[30px] w-[30px] rounded-full object-cover object-center cursor-pointer"
                src={user?.profilePic}
                alt={user?.username}
              />
              <span className="text-lg font-semibold ">Mukesh Bhattarai</span>
            </div>

            <div className="h-[30%]">
              <div className="h-full px-5">
                <textarea
                  ref={postRef}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  type="text"
                  placeholder="What's on your mind..."
                  className="textarea textarea-bordered  w-full h-full  bg-gray-200    rounded-3xl"
                />
              </div>
            </div>
            <div className=" flex justify-around mx-auto px-5">
              <label
                htmlFor="file"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3"
              >
                <MdPermMedia size={30} color="#316ff6" />
                <span className="text-lg font-semibold">Photo</span>

                <input
                  onChange={previewImg}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file"
                />
              </label>
            </div>
            {imgUrl ? (
              <div className=" w-full flex justify-center  rounded-lg">
                <div className="h-[150px] relative">
                  <div
                    onClick={() => setImgUrl(null)}
                    className="absolute top-0 right-0 btn btn-sm btn-circle"
                  >
                    <span>
                      <FaTimes size={20} color="#316ff6" />
                    </span>
                  </div>
                  <img
                    className="h-full w-[200px] object-cover"
                    // src={URL.createObjectURL(image)}

                    src={imgUrl}
                    alt="photo"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              disabled={loading}
              onClick={handlePost}
              className="flex items-center  btn btn-success justify-center text-white "
            >
              {/* <IoMdVideocam size={30} color="#8b0000" /> */}
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold">Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
