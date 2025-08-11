const mongoose = require("mongoose");

const brochureRequestSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects', // Reference to the Projects model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BrochureRequest = mongoose.model("BrochureRequest", brochureRequestSchema);

module.exports = BrochureRequest;