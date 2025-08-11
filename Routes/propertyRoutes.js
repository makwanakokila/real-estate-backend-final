
const express = require('express');
const router = express.Router();
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties
} = require('../Controller/propertyController');

// Admin Routes
router.post('/admin/add', createProperty);
router.put('/admin/:id', updateProperty);
router.delete('/admin/:id', deleteProperty);

// User Route
router.get('/', getProperties);

module.exports = router;
