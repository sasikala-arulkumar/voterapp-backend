const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = require("./app"); // import the Express app

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
