const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subtitle: { type: String },
  image: {
    filename: String,
    path: String,
    uploadedAt: { type: Date, default: Date.now }
  }
});

module.exports = mongoose.model("media", mediaSchema);