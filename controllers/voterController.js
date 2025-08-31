const Voter = require("../models/Voter");

// Get all voters
const getVoters = async (req, res) => {
  const voters = await Voter.find();
  res.json(voters);
};

// Add voter
const addVoter = async (req, res) => {
  const newVoter = new Voter(req.body);
  await newVoter.save();
  res.json(newVoter);
};

// Update voter
const updateVoter = async (req, res) => {
  const { id } = req.params;
  const updatedVoter = await Voter.findByIdAndUpdate(id, req.body, {
    new: true, // return updated document
  });
  if (!updatedVoter) {
    return res.status(404).json({ message: "Voter not found" });
  }
  res.json(updatedVoter);
};

// Delete voter
const deleteVoter = async (req, res) => {
  await Voter.findByIdAndDelete(req.params.id);
  res.json({ message: "Voter deleted" });
};

module.exports = { getVoters, addVoter, updateVoter, deleteVoter };
