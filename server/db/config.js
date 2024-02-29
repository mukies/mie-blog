const mongoose = require("mongoose");
const uri = process.env.URI;

const database = (async () => {
  await mongoose.connect(uri);
  console.log("database connected successfully !!");
})();

module.exports = database;
