import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects 😬" });
  }
});

// GET project by slug
router.get("/:slug", async (req, res) => {
  try {
    console.log("Looking for slug:", req.params.slug); // 🧠 Log slug

    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      console.log("❌ No project found");
      return res.status(404).json({ error: "Project not found" });
    }

    console.log("✅ Project found:", project.title);
    res.json(project);
  } catch (error) {
    console.error("❌ Mongoose error:", error); // 🔍 This is key
    res.status(500).json({ error: "Failed to fetch project 😬" });
  }
});

// UPDATE a project by slug
router.put("/:slug", async (req, res) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true }
    );
    console.log("🔧 Incoming update for:", req.params.slug);
    console.log("📦 Update body:", req.body);


    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project 😬" });
  }
});

// PATCH a project by slug
router.patch("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { $set: updates },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project 😬" });
  }
});


export default router;
