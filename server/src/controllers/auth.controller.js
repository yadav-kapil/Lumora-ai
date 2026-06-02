import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import config from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const refreshTokenCookieBaseOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const refreshTokenCookieOptions = {
  ...refreshTokenCookieBaseOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// register
export const registerUser = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExists) {
    throw new ExpressError(409, "User Already Exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const sessionId = new mongoose.Types.ObjectId();
  const refreshToken = generateRefreshToken(user._id, sessionId.toString());
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await Session.create({
    _id: sessionId,
    userId: user._id,
    refreshToken: hashedRefreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });
  const accessToken = generateAccessToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .json({
      success: true,
      message: "User Added Successfully",
      accessToken,
      user: userResponse,
    });
});

// login
export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    throw new ExpressError(400, "All fields are required");
  }

  // find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ExpressError(401, "Invalid Email or Password");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ExpressError(401, "Invalid Email or Password");
  }

  // generate refresh token
  const sessionId = new mongoose.Types.ObjectId();
  const refreshToken = generateRefreshToken(user._id, sessionId.toString());

  // hash refresh token
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  // create session
  await Session.create({
    _id: sessionId,
    userId: user._id,
    refreshToken: hashedRefreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  // generate access token
  const accessToken = generateAccessToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  // send response
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .json({
      success: true,
      message: "Logged In Successfully",
      accessToken,
      user: userResponse,
    });
});

// logout
export const logoutUser = wrapAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
  } catch (err) {
    return res
      .clearCookie("refreshToken", refreshTokenCookieBaseOptions)
      .status(200)
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  }

  if (!decoded.sessionId) {
    return res
      .clearCookie("refreshToken", refreshTokenCookieBaseOptions)
      .status(200)
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  }

  const session = await Session.findOne({
    _id: decoded.sessionId,
    userId: decoded.id,
    revoked: false,
  });

  if (session) {
    const isMatch = await bcrypt.compare(refreshToken, session.refreshToken);
    if (isMatch) {
      session.revoked = true;
      await session.save();
    }
  }

  return res
    .clearCookie("refreshToken", refreshTokenCookieBaseOptions)
    .status(200)
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

// get-me
export const getMe = wrapAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User Verified Successfully",
    user,
  });
});

// refresh-token
export const refreshAccessToken = wrapAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ExpressError(401, "Unauthorized");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new ExpressError(401, "Invalid Refresh Token");
  }

  if (!decoded.sessionId) {
    throw new ExpressError(401, "Invalid Refresh Token");
  }

  const matchedSession = await Session.findOne({
    _id: decoded.sessionId,
    userId: decoded.id,
    revoked: false,
  });

  if (!matchedSession) {
    throw new ExpressError(401, "Invalid Refresh Token");
  }

  const isMatch = await bcrypt.compare(
    refreshToken,
    matchedSession.refreshToken,
  );

  if (!isMatch) {
    throw new ExpressError(401, "Invalid Refresh Token");
  }

  const newRefreshToken = generateRefreshToken(
    decoded.id,
    matchedSession._id.toString(),
  );
  const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

  const updatedSession = await Session.findOneAndUpdate(
    {
      _id: matchedSession._id,
      userId: decoded.id,
      revoked: false,
      refreshToken: matchedSession.refreshToken,
    },
    {
      $set: {
        refreshToken: hashedRefreshToken,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedSession) {
    throw new ExpressError(409, "Refresh token already rotated");
  }

  const accessToken = generateAccessToken(decoded.id);

  return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions)
    .json({
      success: true,
      message: "Access Token Refreshed Successfully",
      accessToken,
    });
});
