const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
require("dotenv").config();

// database
require("./db/config");

// middlewares
app.use(express.json());
app.use(cookie());

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
