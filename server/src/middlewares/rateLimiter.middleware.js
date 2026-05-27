import rateLimit from "express-rate-limit";

// Global limiter: 100 requests per 15 minutes for general API usage
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes",
  },
});

// Strict limiter: 15 requests per 15 minutes for sensitive routes like auth
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many failed attempts, please try again after 15 minutes",
  },
});
