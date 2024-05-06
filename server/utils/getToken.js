const jwt = require("jsonwebtoken");

exports.getToken = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.KEY);
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
