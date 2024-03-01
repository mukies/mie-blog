const jwt = require("jsonwebtoken");

exports.getToken = (data, res) => {
  const token = jwt.sign(data, process.env.KEY);
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
