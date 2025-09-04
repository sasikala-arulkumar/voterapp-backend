const mongoose = require("mongoose");
require("dotenv").config();
console.log("Loaded MONGODB_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");


const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    console.log("→ Connecting to:", process.env.MONGO_URI || process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas Connected...");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
