import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
  phase: String,
  location: String,
  period: String,
  highlights: [String], // renamed from "tasks" for clarity in  UI
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: String,
  subtitle: String,
  location: String,
  period: String,
  link: String,
  description: String,
  introImage: String,
  image: String,
  hero: String,
  challenges: [String],
  process: [processSchema],
  outcomes: [String],
  learnings: [String],
  wireframes: [String],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
