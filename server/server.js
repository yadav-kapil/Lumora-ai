import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => res.send("Working ... "));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server Listening at Port : ${PORT}`);
});
