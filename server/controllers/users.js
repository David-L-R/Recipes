import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Cannot register user, missing fields");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(400);
    throw new Error("invalid user data");
  }

  res.status(201).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json("User does not exist");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json("Email and password do not match");
  }

  res.status(200).json({});
});
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json("getUser");
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getUser };
