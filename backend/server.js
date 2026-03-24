import dotenv from "dotenv";
dotenv.config();  // ✅ MUST BE FIRST

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import reviewRoutes from "./routes/review.js";

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Debug
console.log("MONGO:", process.env.MONGO_URI);
console.log("OPENROUTER:", process.env.OPENROUTER_API_KEY); // 👈 add this

// 🔥 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔥 Routes
app.use("/api/review", reviewRoutes);

// 🔥 Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});