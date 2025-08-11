const mongoose = require("mongoose");

const interiorSignatureSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  propertyName: {
    type: String,
    required: true,
    minlength: 3
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("InteriorSignature", interiorSignatureSchema);
