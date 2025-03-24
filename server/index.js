const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const updateScoreRoute = require("./routes/updateScore");
const Leaderboard = require("./routes/leaderboard");

dotenv.config();
const app = express();

// ✅ Fix CORS issue
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/update-score", updateScoreRoute);
app.use("/api/leaderboard", Leaderboard);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
