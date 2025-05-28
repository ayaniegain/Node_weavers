import Token from "../model/token.model.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export async function createToken(tokenData) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;

  let token = jwt.sign({ data: tokenData, exp }, process.env.JWT_SECRECT);

  const newToken = new Token({ token, expireAt: exp });

  return await newToken.save();
}

export  function varifyToken(token) {
  jwt.verify(token, process.env.JWT_SECRECT, (decodedToken) => {
    if (!decodedToken) {
        return false;
    } else {
        return decodedToken;
    }
  });

 
}
