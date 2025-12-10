import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  let token = req.cookies.token; // read from cookie

  if (!token) {
    return res.status(401).json({ message: "Not authorized, login required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
