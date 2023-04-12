import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { config } from "../config/index.js";
import asyncHandler from "express-async-handler";
import { transporter } from "../config/email.js";

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { user } = req;

  console.log(user);
  console.log("passwrod");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  user.resetToken = null;

  await user.save();

  console.log("saved");

  return res.status(200).json({ message: "Password reset successfully" });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // check if the email is valid
  // 400 BAD REQUEST
  if (!email) {
    res.status(400);

    throw new Error("Email is required");
  }

  // check if the email exist in the database
  // 400 BAD REQUEST
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // create a reset token
  user.resetToken = createToken(user._id);

  // save the reset token in the database
  const { resetToken } = await user.save();

  const FRONTEND_URL = "http://localhost:3000/reset-password/";

  // send the reset token to the user email
  const mailOptions = {
    from: "noreply@example.com",
    to: email,
    subject: "Password Reset Token",
    text: `If you wanted to reset your password, click on thie link ${FRONTEND_URL}${resetToken}. Please use it to reset your password.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500);
      throw new Error("Error sending reset token email");
    } else {
      console.log(info);
      res.status(200).json({ message: "Reset token sent to the user's email" });
    }
  });
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  // check if anything is missing
  // 400 BAD REQUEST
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Some fields are missing");
  }

  // check if the email unique
  // find a user using this email
  // if user was found => error
  // 400 BAD REQUEST
  // const user = User.findOne({ email: email });
  const user = await User.findOne({ email }).lean();

  console.log("user", user);

  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash the password
  // math => 3rd party encryption library
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  console.log(name, email, password, hash);

  // create a new user
  const newUser = await User.create({
    name,
    email,
    password: hash,
  });

  console.log(newUser);

  if (!newUser) {
    res.status(400);
    throw new Error("User was not created successfully");
  }

  // send the user and a token back
  res.status(201).json({
    user: {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token: createToken(newUser.id),
  });
});

export const login = async (req, res) => {
  // email password
  try {
    const { email, password } = req.body;

    // does user exist? with that email
    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    // check if the password is correct
    // we don't de-hash things, we just hash the password sent in login
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      res.status(400);
      throw new Error("Password is not correct");
    }

    // user is not an object!!! it is a mongoDB object
    delete user.password;

    res.json({
      user,
      token: createToken(user._id),
    });
    // send back user info and token
  } catch (err) {
    res.json({
      message: err.message ? err.message : "Something went wrong",
      stack:
        process.env.NODE_ENV !== config.environment.prd && err.stack
          ? err.stack
          : null,
    });
  }
};
export const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

// create a function that creates a valid token
const createToken = (id) => {
  // create a new token using the id
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: process.env.NODE_ENV !== config.environment.prd ? "30d" : "1h",
  });
};
