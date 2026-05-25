import jwt from "jsonwebtoken";
import config from "../config/config.js";

// ACCESS TOKEN
export const generateAccessToken = (id) => {
  return jwt.sign({ id, type: "access" }, config.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// REFRESH TOKEN
export const generateRefreshToken = (id, sessionId) => {
  return jwt.sign(
    { id, sessionId, type: "refresh" },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
