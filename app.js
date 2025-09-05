const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const voterRoutes = require("./routes/voterRoutes");

require("dotenv").config();
const app = express();

// 🔹 MongoDB connect
connectDB();

// 🔹 Allowed origins (both local + netlify)
const allowedOrigins = [
  "http://localhost:3000",           // local React
  "https://sasi-voterapp.netlify.app",
  "https://voterapp-c47d7.web.app",
  "https://voterapp-c47d7.firebaseapp.com"

   // deployed frontend
];

// app.use(cors({
//     origin:["http://localhost:3000",
//             "https://sasi-voterapp.netlify.app"]
// }));

app.use(cors({
  origin: ["https://voterapp-c47d7.web.app", "https://voterapp-c47d7.firebaseapp.com","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "5mb" })); // allow base64 images

// API routes
app.use("/api/voters", voterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
