import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Token expiration: 1 hour
const TOKEN_EXPIRATION = 60 * 60;

export function createToken(tokenData) {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION;

  const token = jwt.sign(
    {
      data: tokenData,
      exp,
    },
    JWT_SECRET
  );

  return token;

  // If saving to DB is required:
  // const newToken = new Token({ token, expireAt: exp });
  // return await newToken.save();
}

export function varifyToken(token) {
  console.log("tvoken", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("decoded", decoded);
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return false;
  }
}
