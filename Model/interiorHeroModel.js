const mongoose = require("mongoose");

const interiorHeroSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  subtitle: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("InteriorHero", interiorHeroSchema);
