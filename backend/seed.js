import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cards from "./data/cardsData.js";
import experience from "./data/experienceData.js";
import projects from "./data/projectsData.js";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("portfolio");

    // Optional: Clear collections before inserting
    await db.collection("cards").deleteMany({});
    await db.collection("experience").deleteMany({});
    await db.collection("projects").deleteMany({});

    // Insert data
    await db.collection("cards").insertMany(cards);
    await db.collection("experience").insertMany(experience);
    await db.collection("projects").insertMany(Object.values(projects));

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await client.close();
  }
}

seed();
