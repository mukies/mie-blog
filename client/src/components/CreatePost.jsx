import { MdPermMedia } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const postRef = useRef();

  // add post hook
  const { loading, addPost } = usePost();

  const handlePost = () => {
    if (!text && !image) {
      alert("Nothing to post");
    } else {
      addPost(text, image);
      setShow(false);
      setText("");
      // console.log(image);
    }
  };

  return (
    <div className=" flex py-2 justify-center flex-col gap-2">
      <div className="flex bg-white rounded-3xl justify-between mx-auto gap-3  w-[80%] py-2 md:p-5 items-center">
        <div
          onClick={() => navigate(`/profile/${auth?.username}`)}
          className="w-[50px] rounded-full overflow-hidden cursor-pointer"
        >
          <img
            alt="Tailwind CSS Navbar component"
            className=""
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
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
            className="input w-full bg-gray-200 input-md  rounded-3xl"
          />
        </div>
      </div>
      <div className="w-[80%] flex justify-around mx-auto px-5">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3">
          <IoMdVideocam size={30} color="#8b0000" />
          <span className="text-lg font-semibold">Live</span>
        </div>
        <div
          onClick={() => setShow((p) => !p)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-4 py-3"
        >
          <MdPermMedia size={30} color="#316ff6" />
          <span className="text-lg font-semibold">Photo/Video</span>
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
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="profile-pic"
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
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file"
                />
              </label>
            </div>
            {image ? (
              <div className=" w-full flex justify-center  rounded-lg">
                <div className="h-[150px] relative">
                  <div
                    onClick={() => setImage(null)}
                    className="absolute top-0 right-0 btn btn-sm btn-circle"
                  >
                    <span>
                      <FaTimes size={20} color="#316ff6" />
                    </span>
                  </div>
                  <img
                    className="h-full w-[200px] object-cover"
                    src={URL.createObjectURL(image)}
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
