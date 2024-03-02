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
        const isMatched = await bcrypt.compare(password, isRegister.password);

        if (isMatched) {
          // get jwt token and send cookie
          getToken(isRegister._id, res);

          res.json({
            success: true,
            message: "Login Successful.",
            data: {
              _id: isRegister._id,
              fullName: isRegister.fullName,
              username: isRegister.username,
              email: isRegister.email,
              isFrozen: isRegister.isFrozen,
            },
          });
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

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({ success: true, message: "logout successfully" });
};

exports.followUnfollow = async (req, res) => {
  const othersID = req.params.id;
  const currentUserID = req.user._id;

  if (othersID == currentUserID.toString())
    return res.json({
      success: false,
      message: "you can not follow yourself.",
    });

  // check if the user is already folowed or not
  const isFollowing = req.user.followings.includes(othersID);

  if (isFollowing) {
    // unfollow or remove from my following list
    await userModel.findByIdAndUpdate(
      { _id: currentUserID },
      { $pull: { followings: othersID } }
    );
    //  remove from others followers list
    await userModel.findByIdAndUpdate(
      { _id: othersID },
      { $pull: { followers: currentUserID } }
    );

    res.json({
      success: true,
      message: "removed from following list",
    });
  } else {
    // add into my following list
    await userModel.findByIdAndUpdate(
      { _id: currentUserID },
      { $push: { followings: othersID } }
    );
    //  add into others followers list
    await userModel.findByIdAndUpdate(
      { _id: othersID },
      { $push: { followers: currentUserID } }
    );

    res.json({
      success: true,
      message: "added to following list",
    });
  }
};
