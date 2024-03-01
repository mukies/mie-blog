const mongoose = require("mongoose");
const userModel = require("../model/user.model");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getToken } = require("../utils/getToken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const slug = slugify(username, "-");

  try {
    // validation
    if (!username || !password) {
      res.json({
        success: false,
        message: "Please Enter username and password.",
      });
    } else {
      // registration check
      const slug = slugify(username, "-");
      const newUsername = `@${slug}`;
      const isRegister = await userModel.findOne({
        $or: [{ email: username }, { username: newUsername }],
      });

      if (isRegister) {
        //    password check
        console.log(isRegister.password);
        const isMatched = await bcrypt.compare(password, isRegister.password);

        if (isMatched) {
          // get jwt token and send cookie
          getToken(isRegister, res);
        } else {
          res.json({
            success: false,
            message: "Invalid Email or Password.",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Invalid Email or Password.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error in login controller",
    });
  }
};

exports.register = async (req, res) => {
  const { fullName, username, email, password, gender } = req.body;

  try {
    // validation
    if (!fullName || !username || !email || !password || !gender) {
      res.json({
        success: false,
        message: "Fill all the form first.",
      });
    } else {
      const slug = slugify(username, "-");
      const newUsername = `@${slug}`;
      const isExist = await userModel.findOne({
        $or: [{ email }, { username: newUsername }],
      });

      // email check
      if (isExist) {
        res.json({
          success: false,
          message: "Email already exist.",
        });
      } else {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const data = new userModel({
          fullName,
          username: newUsername,
          email,
          gender,
          password: hashedPassword,
        });
        await data.save();
        res.json({
          success: true,
          message: "Account Created Successfully.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error",
    });
  }
};
