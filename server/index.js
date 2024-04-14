const express = require("express");
require("dotenv").config();
const { v2 } = require("cloudinary");
const cookie = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const messageRoutes = require("./routes/message.route");
const adminRoutes = require("./routes/admin.route");
const { app, server } = require("./socket/socket");
const path = require("path");
const port = process.env.PORT;
// let __dirname = path.resolve();

// database
require("./db/config");

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// cloudinary
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/admin", adminRoutes);

// http://localhost:8080 => backend,frontend

if (process.env.NODE_ENV == "prod") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // react app
  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
