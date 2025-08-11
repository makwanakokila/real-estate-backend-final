const mongoose = require('mongoose');

const plottingFloralSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  bhkType: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  facilities: [
    {
      type: String,
      required: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('PlottingFloral', plottingFloralSchema);