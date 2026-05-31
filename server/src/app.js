import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import ExpressError from "./utils/ExpressError.js";
import config from "./config/config.js";
import { globalLimiter } from "./middlewares/rateLimiter.middleware.js";

//Routers Modules
import authRoutes from "./routes/user.routes.js";
import imageGenerationRoutes from "./routes/imageGeneration.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", globalLimiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/text-to-image", imageGenerationRoutes);

// error handlers
app.use((req, res, next) => {
  throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message,
  });
});

export default app;