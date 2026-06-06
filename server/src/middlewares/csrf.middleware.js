import ExpressError from "../utils/ExpressError.js";
import config from "../config/config.js";

const getOriginFromRequest = (req) => {
  // Check Origin header first
  const originHeader = req.get("origin");

  if (originHeader) {
    return originHeader;
  }

  // Fallback to Referer header
  const refererHeader = req.get("referer");

  if (!refererHeader) {
    return null;
  }

  try {
    return new URL(refererHeader).origin;
  } catch {
    return null;
  }
};

const protectCsrf = (req, res, next) => {
  const requestOrigin = getOriginFromRequest(req);

  if (!requestOrigin) {
    throw new ExpressError(403, "Invalid request origin");
  }

  if (!config.CLIENT_ORIGIN.includes(requestOrigin)) {
    throw new ExpressError(403, "CSRF validation failed");
  }

  next();
};

export default protectCsrf;