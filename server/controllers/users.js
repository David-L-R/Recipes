import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).json("Email and password do not match");
    }

    delete user.password;

    res.status(200).json({ user, token: generateToken(user._id) });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getUser };
