import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    if (!authorization?.startsWith("Bearer")) {
      res.status(401);
      throw new Error("Not a Bearer Token");
    }

    let [bearer, token] = authorization.split(" ");

    if (!token) {
      res.status(401);
      throw new Error("Token is missing");
    }

    const user = await User.findById(
      jwt.verify(token, process.env.JWT).id
    ).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("user was not found");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.message === "invalid signature") res.status(401);
    throw new Error(err.message);
  }
});
