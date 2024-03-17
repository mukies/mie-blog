const express = require("express");
const app = express();
require("dotenv").config();
const { v2 } = require("cloudinary");
const cookie = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const messageRoutes = require("./routes/message.route");

// database
require("./db/config");

// middlewares
app.use(express.json({ limit: "50mb" }));
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
