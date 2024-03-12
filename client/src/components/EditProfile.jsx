/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfile({ action, data }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(data.fullName);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const changeDetails = async () => {
    setLoading(true);
    if (fullName.length < 4) {
      setError(true);
      toast.error("Fullname should be more than 3 character.");
      return;
    }

    try {
      const { data } = await axios.put("/api/user/update-profile", {
        fullName,
      });

      if (data.success) {
        toast.success("Name has been changed.");
        navigate("/");
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-full w-full md:h-[90%] md:w-[50%] lg:w-[30%]  md:rounded-lg flex justify-center p-5   relative">
      <div
        onClick={() => action((p) => !p)}
        className="absolute top-0 right-0 btn btn-md btn-circle"
      >
        <span>
          <FaTimes color="red" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="capitalize text-center text-xl font-semibold">
          Change your details
        </span>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label
            className={
              fullName.length < 4 && error
                ? "input input-error  flex items-center gap-2"
                : "input input-bordered  flex items-center gap-2"
            }
          >
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="grow"
              placeholder="Full Name"
            />
          </label>
          <label className="input input-disabled  flex items-center gap-2">
            <input
              value={data.username}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-disabled input-bordered flex items-center gap-2">
            <input
              value={data.email}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          <button
            disabled={loading}
            onClick={changeDetails}
            className="btn btn-success btn-sm text-white "
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save"
            )}
          </button>
        </form>
        <span className="capitalize text-center text-xl font-semibold">
          Change your Password
        </span>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Old Password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="New Password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
            />
          </label>
          <button className="capitalize btn btn-success btn-sm text-white ">
            change password
          </button>
        </form>
      </div>
    </div>
  );
}
