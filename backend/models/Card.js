// models/Card.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  slug: String,
  title: String,
  subtitle: String,
  roles: [String],
  tech: [String],
  image: String,
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
