const mongoose = require("mongoose");

const serchingSchema = new mongoose.Schema({
  flatOrSchemeName: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  carpetArea: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  floorsRequired: {
    type: String,
  },
  timeline: {
    type: String,
  },
  suggestion: {
    type: String,
  },
  image: {
    type: String, // URL or path of image
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Serching", serchingSchema);