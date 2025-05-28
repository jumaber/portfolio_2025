import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from "./routes/projects.js"; // adjust path if needed

dotenv.config(); // Load your .env file

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json()); // Middleware to parse JSON
app.use("/api/projects", projectRoutes);

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
