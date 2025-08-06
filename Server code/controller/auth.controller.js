import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { username, pin } = req.body;

    if (!username || !pin) {
      return res.status(400).json({ message: "Username and PIN are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already existing" });
    }

    const hashedPin = await bcrypt.hash(pin, 10);
    const newUser = new User({
      username,
      pin: hashedPin,
      vault: [],
    });
    await newUser.save();
    return res.status(201).json({ success:"true" , message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server signup error" });
  }
};

const signin = async (req, res) => {
  try {
    const { username, pin } = req.body;
    if (!username || !pin) {
      return res
        .status(400)
        .json({ message: "Plase provide Username and PIN" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not exist please signup first" });
    }

    const isPasswordCorrect = await bcrypt.compare(pin, existingUser.pin);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid PIN" });
    }

    const payload = { id: existingUser._id, username: existingUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.status(201).json({
      success:"true" ,
      message: "Login successful",
      token,
      user: { id: existingUser._id, username: existingUser.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json ({ message: "Server signin error" });
  }
};

export { signup, signin };
