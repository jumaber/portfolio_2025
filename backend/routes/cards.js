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


// PUT by slug
router.put("/slug/:slug", async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card by slug:", error);
    res.status(500).json({ error: "Failed to update card by slug 😬" });
  }
});


// GET card by slug

router.get("/slug/:slug", async (req, res) => {
  try {
    const card = await Card.findOne({ slug: req.params.slug });
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch card by slug 😬" });
  }
});


// GET card by id

router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch card by ID 😬" });
  }
});



export default router;
