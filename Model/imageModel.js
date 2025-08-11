const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  builderGroup: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Image", imageSchema);
