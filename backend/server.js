import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import projectRoutes from "./routes/projects.js";
import cardRoutes from "./routes/cards.js";


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json()); // Middleware to parse JSON

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://portfolio-2025-wyed.onrender.com",
      "https://juliamaribernaus.netlify.app",
      "https://juliamaribernaus.com"
    ],
  })
);

app.use("/api/projects", projectRoutes);
app.use("/api/cards", cardRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));


  // Example route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



