const mongoose = require("mongoose");

const architectureHeroSchema = new mongoose.Schema({
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

module.exports = mongoose.model("ArchitectureHero", architectureHeroSchema);
