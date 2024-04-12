const adminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/getToken");
const userModel = require("../model/user.model");
const postModel = require("../model/post.model");
const conversationModel = require("../model/conversation.model");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const registrationCheck = await adminModel.find();
    console.log("test", registrationCheck);

    if (registrationCheck.length > 0) {
      res.json({
        success: false,
        message: "Admin already registered.",
      });
      return;
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error registering",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const registrationCheck = await adminModel.findOne({ email });

    if (!registrationCheck) {
      return res.json({
        success: false,
        message: "Incorrect credentials.",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, registrationCheck.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Incorrect credentials.",
      });

    getToken(registrationCheck._id, res);

    res.json({
      success: true,
      message: "login successful.",
      user: {
        _id: registrationCheck._id,
        name: registrationCheck.name,
        email: registrationCheck.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error logging in",
    });
  }
};

exports.registrationCheck = async (req, res) => {
  try {
    const isRegister = await adminModel.find();

    if (isRegister.length > 0) {
      res.json({
        success: true,
        message: "Admin already registered.",
        isRegister: true,
      });
    } else {
      res.json({
        success: true,
        message: "Admin not registered yet.",
        isRegister: false,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while registration check.",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ success: true, message: "logout successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error logging out",
    });
  }
};

exports.adminGetAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("username")
      .select("fullName")
      .select("profilePic")
      .select("createdAt")
      .select("isFrozen");
    res.json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching users",
    });
  }
};

exports.getUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userModel
      .findOne({ username })
      .select("-password")
      .populate("followers", "profilePic fullName username")
      .populate("followings", "profilePic fullName username");

    if (!user) {
      return res.json({ success: false, message: "user not found." });
    } else {
      res.json({ success: true, message: "user found.", user });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error in get user controller.",
      error,
    });
  }
};

exports.adminSearchUser = async (req, res) => {
  const { key } = req.params;
  try {
    const users = await userModel
      .find({
        $or: [{ fullName: { $regex: key } }, { username: { $regex: key } }],
      })
      .select("fullName")
      .select("profilePic")
      .select("username");

    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while searching user.",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await conversationModel.deleteMany({ users: { $in: req.params.id } });

    const user = await userModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while deleting user",
    });
  }
};

exports.freezeAccount = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.id });
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.isFrozen) {
      user.isFrozen = false;
    } else {
      user.isFrozen = true;
    }

    await user.save();
    res.json({
      success: true,
      message: user.isFrozen ? "Account disabled." : "Account enabled.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while freezing account",
    });
  }
};

exports.changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  // validation
  if (!confirmPassword || !password)
    return res.json({
      success: false,
      message: "All the input fields are required.",
    });

  if (password !== confirmPassword)
    return res.json({ success: false, message: "password mismatch." });

  if (password.length < 6)
    return res.json({
      success: false,
      message: "password must be at least 6 characters.",
    });

  try {
    const admin = await adminModel.findById(req.user._id);
    if (!admin)
      return res.json({ success: false, message: "admin not found." });

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    admin.save();
    res.json({ success: true, message: "Admin password has been changed." });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while changing password.",
    });
  }
};
