import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { config } from "../config/index.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

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

  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash the password
  // math => 3rd party encryption library
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  // create a new user
  const newUser = await User.create({
    name,
    email,
    password: hash,
  });

  if (!newUser) {
    res.status(400);
    throw new Error("User was not created successfully");
  }

  // send the user and a token back
  res.status(201).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: createToken(newUser.id),
  });
  // } catch (err) {
  //   res.json({
  //     message: err.message ? err.message : "Something went wrong",
  //     stack: err.stack ? err.stack : null,
  //   });
  // }
});

const asyncHandler = (fn) => async (req, res, next) => {
  // Promise.resolve(fn(req, res, next)).catch(next);

  try {
    fn(req, res, next);
  } catch {
    next(err);
  }
};

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
export const getUserInfo = async (req, res) => {
  res.status(200).json(req.user);
};

// create a function that creates a valid token
const createToken = (id) => {
  // create a new token using the id
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: process.env.NODE_ENV !== config.environment.prd ? "30d" : "1h",
  });
};
