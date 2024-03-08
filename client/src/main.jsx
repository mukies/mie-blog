import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FeedProvider } from "./context/FeedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FeedProvider>
        <App />
      </FeedProvider>
    </BrowserRouter>
  </React.StrictMode>
);
