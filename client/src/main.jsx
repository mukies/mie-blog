import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FeedProvider } from "./context/FeedContext.jsx";
import { SinglePostProvider } from "./context/SinglePostContext.jsx";
import { ProfileContextProvider } from "./context/ProfilePost.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessageProvider } from "./context/MessageContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { ConversationProvider } from "./context/ConversationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <ConversationProvider>
          <FeedProvider>
            <ProfileContextProvider>
              <SinglePostProvider>
                <MessageProvider>
                  <ToastContainer />
                  <App />
                </MessageProvider>
              </SinglePostProvider>
            </ProfileContextProvider>
          </FeedProvider>
        </ConversationProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
