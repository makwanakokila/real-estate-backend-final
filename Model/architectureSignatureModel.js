const mongoose = require('mongoose');

const architectureSignatureSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ArchitectureSignature', architectureSignatureSchema);
