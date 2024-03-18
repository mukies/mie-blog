/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
// import useGetMessage from "../hooks/useGetMessage";
import useUserDetails from "../hooks/useUserDetails";
import { useMessage } from "../context/MessageContext";
import { useParams } from "react-router-dom";
import Message from "./Message";

export default function MessageSection({ user }) {
  const { id } = useParams();
  const { messages, loading, getMessage } = useMessage();
  const auth = JSON.parse(localStorage.getItem("_L"));
  const msgRef = useRef();
  //   const {  } = useGetMessage();
  const {
    getUserDetails,
    loading: userLoading,
    user: loginUser,
  } = useUserDetails();

  setTimeout(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 10);

  useEffect(() => {
    getMessage(id);
    getUserDetails(auth?.username);
    // return () => clearTimeout(timer);
  }, [id]);

  return (
    <div
      className={
        loading || userLoading || !messages?.messages?.length
          ? "border-l-2 border-b-2 rounded-b-md border-r-2 border-gray-300 flex justify-center items-center h-[calc(100%-120px)] p-3 overflow-auto "
          : "border-l-2 border-b-2 rounded-b-md border-r-2 border-gray-300 flex flex-col gap-5 h-[calc(100%-120px)] p-3 overflow-auto "
      }
    >
      {loading || userLoading ? (
        <span className="loading loading-spinner scale-125"></span>
      ) : !loading &&
        !userLoading &&
        messages?.messages.length &&
        user &&
        loginUser ? (
        messages.messages.map((item, i) => (
          <div ref={msgRef} key={i}>
            <Message
              userLoading={userLoading}
              msg={item}
              loginUser={loginUser}
              otherUser={user}
            />
          </div>
        ))
      ) : (
        <span className="text-2xl font-semibold">
          Say hi to start conversation.
        </span>
      )}
    </div>
  );
}
