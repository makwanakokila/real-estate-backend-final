
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: [
      'satellite', 'bopal', 'sg highway', 'thaltej', 'navrangpura', 'vastrapur',
      'prahladnagar', 'gota', 'chandkheda', 'vasna', 'maninagar', 'paldi',
      'naranpura', 'sabarmati', 'ranip', 'isanpur', 'memnagar', 'shahibaug'
    ]
  },
  priceRange: {
    min: { type: Number, min: 1, max: 100000000, required: true },
    max: { type: Number, min: 1, max: 100000000, required: true }
  },
  superArea: {
    min: { type: Number, min: 1, max: 100000000 },
    max: { type: Number, min: 1, max: 100000000 }
  },
  carpetArea: {
    min: { type: Number, min: 1, max: 100000000 },
    max: { type: Number, min: 1, max: 100000000 }
  },
  propertyType: {
    type: String,
    enum: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Bungalow', 'Duplex'],
    required: true
  },
  floorsRequired: {
    type: String,
    enum: ['All Floors', 'G+1', 'G+2', 'G+3', 'G+4+'],
    default: 'All Floors'
  },
  projectTimeline: {
    type: String,
    enum: ['Any Timeline', 'Ready to Move', 'Just Started', 'Under Construction', 'Launching Soon'],
    default: 'Any Timeline'
  },
  suggestion: { type: String, trim: true },
  screenshots: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
