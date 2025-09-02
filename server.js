// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const mongoose = require("mongoose");
// const voterRoutes = require("./routes/voterRoutes");

// require("dotenv").config();
// const app = express();

// // 🔹 MongoDB connect
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => console.log("✅ MongoDB connected"))
// //   .catch(err => console.error("❌ MongoDB connection error:", err));
// connectDB();
// app.use(cors({
//     origin: ["https://your-frontend.netlify.app"],
//     methods: ["GET","POST","PUT","DELETE"]
//     // credentials: true
//  }));
// //  
// app.use(express.json({ limit: "5mb" })); // allow base64 images

// // API routes
// app.use("/api/voters", voterRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
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
  "https://sasi-voterapp.netlify.app" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, ThunderClient)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy does not allow access from this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "5mb" })); // allow base64 images

// API routes
app.use("/api/voters", voterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
