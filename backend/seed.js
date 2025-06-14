import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// import cards from "./data/cardsData.js";
// import experience from "./data/experienceData.js";
import rawProjects from "./data/projectsData.js";

dotenv.config({ path: "./.env" });
console.log("📦 MONGO_URI loaded:", process.env.MONGO_URI);


const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Helper to add slug to each project
const projects = Object.entries(rawProjects).map(([key, project]) => ({
  ...project,
  slug: key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
}));

async function seed() {
  try {
    await client.connect();
    const db = client.db("portfolio");

    // Optional: Clear collections
    // await db.collection("cards").deleteMany({});
    // await db.collection("experience").deleteMany({});
    await db.collection("projects").deleteMany({});

    // Insert updated data
    // await db.collection("cards").insertMany(cards);
    // await db.collection("experience").insertMany(experience);
    await db.collection("projects").insertMany(projects);

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await client.close();
  }
}

seed();
