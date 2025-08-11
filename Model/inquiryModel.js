const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^\d{10}$/.test(v);
      },
      message: "Phone must be 10 digits",
    },
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Inquiry", inquirySchema);
