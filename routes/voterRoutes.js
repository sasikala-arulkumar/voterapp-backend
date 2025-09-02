const express = require("express");
const Voter = require("../models/Voter");

const router = express.Router();

// ➝ Get all voters
router.get("/", async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➝ Add new voter
router.post("/", async (req, res) => {
  try {
    const voter = new Voter(req.body);
    const saved = await voter.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ➝ Update voter
router.put("/:id", async (req, res) => {
  try {
    const updated = await Voter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Voter not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ➝ Delete voter
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Voter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Voter not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
