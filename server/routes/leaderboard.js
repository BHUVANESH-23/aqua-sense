const express = require('express');
const Leaderboard = require('../models/User'); // Assuming you have a Leaderboard model

const router = express.Router();
// Get all leaderboard entries
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1 }); // Sort by score in descending order
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;