import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

//Routers Modules
import authRoutes from "./routes/user.routes.js";
import ExpressError from "./utils/ExpressError.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);

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