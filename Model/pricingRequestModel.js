const mongoose = require('mongoose');

const pricingRequestSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    required: false
  },
  fullName: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('PricingRequest', pricingRequestSchema);
