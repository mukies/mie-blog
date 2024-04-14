/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("https://mie-0fly.onrender.com", {
      query: {
        userID: auth?._id,
      },
    });

    setSocket(socket);

    socket.on("onlineUsers", (item) => {
      setOnlineUsers(item);
    });

    return () => socket && socket.close();
  }, [auth?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
