const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, score } = req.body;
  
    if (!email) return res.status(400).json({ error: "Email is required" });
  
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { score } },
        { new: true, upsert: true }
      );
  
      res.json({ message: "Score updated", user });
    } catch (error) {
      res.status(500).json({ error: "Failed to update score" });
    }
  });
  
module.exports = router;