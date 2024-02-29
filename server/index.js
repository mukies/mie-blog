const express = require("express");
const app = express();
require("dotenv").config();

// database
require("./db/config");

// middlewares
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
