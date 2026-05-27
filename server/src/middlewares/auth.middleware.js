import config from "../config/config.js";
import User from "../models/user.model.js";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";

const authenticate = wrapAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ExpressError(401, "Unauthorized");
  }

  // extract token
  const accessToken = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
  } catch (err) {
    throw new ExpressError(401, "Invalid Token");
  }

  if (decoded.type !== "access") {
    throw new ExpressError(401, "Invalid Token Type");
  }

  // find user
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ExpressError(401, "User Not Found");
  }

  // attach user
  req.user = user;

  next();
});

export default authenticate;
