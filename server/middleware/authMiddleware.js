import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  // 1. READ THE TOKEN

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new Error("Unauthorized, authorization header is missing");
  }

  // authrization => `Bearer ${token}`
  // const token = authrization.split(" ")[1] // ["Bearer", "token"]
  const [_, token] = authorization.split(" "); // ["Bearer", "token"]

  if (!token) {
    throw new Error("Unauthorized, missing token");
  }

  // 2. VERIFY THE TOKEN

  try {
    const { id } = jwt.verify(token, process.env.JWT);

    // 3. CHECK IF USER STILL EXISTS

    // TODO: check if false id send an error
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(error?.message || error.toString());
  }
};
