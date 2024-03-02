const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../model/user.model");

exports.protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
      const decode = jsonwebtoken.verify(token, process.env.KEY);
      if (!decode) {
        return res.status(400).json({
          success: false,
          message: "Invalid Token.",
        });
      } else {
        const user = await userModel
          .findById({ _id: decode.userID })
          .select("-password");
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User not found.",
          });
        } else {
          req.user = user;
          next();
        }
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Token.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on protected route.",
    });
  }
};
