import { varifyToken } from "../services/token.service.js";

export const authmiddleWare = async (req, res, next) => {
  try {
    const rawToken = req.headers?.authorization;

    if (!rawToken || !rawToken.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or malformed" });
    }

    const token = rawToken.split("Bearer ")[1];
    // console.log('token =', token);

    const tokenData = varifyToken(token); // Assume this returns decoded token payload or null
    console.log("tokenData =", tokenData);

    if (!tokenData) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Optional: Attach user info to request if needed
    // req.user = tokenData;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in auth middleware" });
  }
};
