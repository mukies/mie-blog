import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSocket } from "../context/SocketContext";

export default function useFollowers() {
  const [followers, setFollowers] = useState([]);
  const [followersLoading, setFollowersLoading] = useState(false);
  const { onlineUsers } = useSocket();

  const getFollowers = async (username) => {
    setFollowersLoading(true);
    try {
      const { data } = await axios.get(`/api/user/followers/${username}`);
      if (data.success) {
        const onlineFollowers = data.user.followers?.filter((i) =>
          onlineUsers?.includes(i._id)
        );
        const onlineFollowings = data.user.followings?.filter((i) =>
          onlineUsers?.includes(i._id)
        );
        const offlineFollowers = data.user.followers?.filter(
          (i) => !onlineUsers?.includes(i._id)
        );
        const offlineFollowings = data.user.followings?.filter(
          (i) => !onlineUsers?.includes(i._id)
        );

        const newArray = [
          ...onlineFollowers,
          ...onlineFollowings,
          ...offlineFollowers,
          ...offlineFollowings,
        ];

        //remove duplicates users
        const users = newArray.filter(
          (obj, index, self) =>
            index === self.findIndex((o) => o._id === obj._id)
        );

        setFollowers(users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFollowersLoading(false);
    }
  };
  return { followers, followersLoading, getFollowers };
}
