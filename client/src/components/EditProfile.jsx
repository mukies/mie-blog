/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfile({ action, data }) {
  const navigate = useNavigate();
  // name change
  const [fullName, setFullName] = useState(data.fullName);
  const [loading, setLoading] = useState(false);

  // password change
  const [old, setOld] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passLoading, setPassLoading] = useState(false);
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

  const changePassword = async () => {
    if (!newPass || !old || !confirmPass) {
      setError(true);
    } else {
      setPassLoading(true);
      try {
        if (newPass == confirmPass) {
          if (newPass.length < 6) {
            toast.error("Password must be greater than 6 charecter.");
          } else {
            const { data } = await axios.put("/api/user/change-password", {
              newPassword: newPass,
              oldPassword: old,
            });

            if (data.success) {
              toast.success("Password changed successfully.");
              setOld("");
              setNewPass("");
              setConfirmPass("");
              action((p) => !p);
            } else {
              toast.error(data.message);
            }
          }
        } else {
          toast.error("Incorrect confirm password.");
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setPassLoading(false);
      }
    }
  };

  return (
    <div className="bg-white h-[80vh] overflow-auto w-full md:h-[90%] md:w-[50%] lg:w-[30%]  md:rounded-lg flex justify-center p-5  relative">
      <div
        onClick={() => action((p) => !p)}
        className="absolute bg-gray-200 border-none top-[10px] sm:top-0 right-0 btn btn-md btn-circle"
      >
        <span>
          <FaTimes color="red" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="capitalize text-center text-black text-xl font-semibold">
          Change your details
        </span>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label
            className={
              fullName?.length < 4 && error
                ? "input input-error bg-gray-100 flex items-center gap-2"
                : "input input-bordered bg-gray-100  flex items-center gap-2"
            }
          >
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="grow placeholder:text-gray-400 text-gray-500"
              placeholder="Full Name"
            />
          </label>
          <label className="input input-disabled flex items-center gap-2">
            <input
              defaultValue={data.username}
              type="text"
              className="grow "
              placeholder="Username"
            />
          </label>
          <label className="input input-disabled input-bordered flex items-center gap-2">
            <input
              defaultValue={data.email}
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
        <span className="capitalize text-black text-center text-xl font-semibold">
          Change your Password
        </span>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label className="input input-bordered bg-gray-100 flex items-center gap-2">
            <input
              value={old}
              onChange={(e) => setOld(e.target.value)}
              type="password"
              className="grow"
              placeholder="Old Password"
            />
          </label>
          <label className="input input-bordered bg-gray-100 flex items-center gap-2">
            <input
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              className="grow"
              placeholder="New Password"
            />
          </label>
          <label className="input input-bordered bg-gray-100 flex items-center gap-2">
            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              className="grow"
              placeholder="Confirm Password"
            />
          </label>
          <button
            disabled={passLoading}
            onClick={changePassword}
            className="capitalize btn btn-success btn-sm text-white "
          >
            change password
          </button>
        </form>
      </div>
    </div>
  );
}
