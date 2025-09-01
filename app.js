const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const voterRoutes = require("./routes/voterRoutes");

const app = express();

const allowedOrigins = [                  
  "https://cheerful-sopapillas-b7856b.netlify.app/" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or mobile)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use("/api/voters", voterRoutes);

// Your PUT route (optional, can move to voterRoutes)
const Voter = require("./models/Voter");

app.put("/api/voters/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid voter ID" });
  }

  try {
    const updatedVoter = await Voter.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVoter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res.json({ message: "Voter updated successfully", voter: updatedVoter });
  } catch (err) {
    console.error("Error updating voter:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;


// ✅ Serve React frontend build
// Make sure you have copied your React build folder into backend as frontend/build
// const buildPath = path.join(__dirname, "frontend", "build");
// app.use(express.static(buildPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// app.use((req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// app.use(cors({
//   origin: "https://sasiarul-voterapp.netlify.app/", // 👈 your Netlify link
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));



