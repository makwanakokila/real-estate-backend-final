const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  natureOfEnquiry: {
    type: String,
    enum: ['General Inquiry', 'Careers', 'PR & Collaborations'],
    required: true,
  },
  location: {
    type: String,
    default: 'Ahmedabad',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);