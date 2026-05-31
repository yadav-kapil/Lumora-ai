import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in env variable");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in env variable");
}

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not defined");
}

if (!process.env.CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN is not defined");
}

if (!process.env.NODE_ENV) {
  throw new Error("CLIENT_ORIGIN is not defined");
}

if (!process.env.STOCK_API_KEY) {
  throw new Error("CLIENT_ORIGIN is not defined");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN.trim(),
  NODE_ENV: process.env.NODE_ENV,
  STOCK_API_KEY: process.env.STOCK_API_KEY
};

export default config;
