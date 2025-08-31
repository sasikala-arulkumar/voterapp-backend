// const express = require("express");
// const Voter = require("../models/Voter");
// const router = express.Router();

// // Create voter
// router.post("/", async (req, res) => {
//   try {
//     const voter = new Voter(req.body);
//     await voter.save();
//     res.status(201).json(voter);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get all voters
// router.get("/", async (req, res) => {
//   try {
//     const voters = await Voter.find();
//     res.json(voters);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete voter by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const voter = await Voter.findByIdAndDelete(req.params.id);
//     if (!voter) return res.status(404).json({ message: "Voter not found" });
//     res.json({ message: "Voter deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Voter = require("../models/Voter"); // adjust path if needed
const router = express.Router();

// CREATE a voter
router.post("/", async (req, res) => {
  try {
    const voter = await Voter.create(req.body);
    res.status(201).json(voter); // return created voter
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all voters
router.get("/", async (req, res) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ one voter by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const voter = await Voter.findById(id);
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    res.status(200).json(voter);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a voter
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const updatedVoter = await Voter.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedVoter) return res.status(404).json({ message: "Voter not found" });
    res.status(200).json({ message: "Voter updated successfully", voter: updatedVoter });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a voter
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const voter = await Voter.findByIdAndDelete(id);
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    res.status(200).json({ message: "Voter deleted successfully", voter });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
