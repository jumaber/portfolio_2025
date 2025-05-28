// routes/cards.js
import express from "express";
import Card from "../models/Card.js";

const router = express.Router();

// GET all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Failed to fetch cards 😬" });
  }
});

// PUT update a card by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card 😬" });
  }
});

export default router;
