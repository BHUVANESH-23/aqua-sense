const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 } // ✅ Add score field (default: 0)
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
