const adminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getToken } = require("../utils/getToken");

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

    if (registrationCheck.length > 0) {
      res.json({
        success: false,
        message: "Admin already registered.",
      });
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
        message: "Admin not registered.",
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
