const express = require('express');
const router = express.Router();
const controller = require('../Controller/plottingFloralController');

// Add villa with image upload middleware
router.post('/plottingFloral', controller.uploadVillaImage, controller.addVilla);

// Get villas
router.get('/plottingFloral', controller.getAllVillas);
router.get('/plottingFloral/:id', controller.getVillaById);

// Delete a villa
router.delete('/plottingFloral/:id', controller.deleteVilla);

// --- THIS LINE IS ADDED ---
// Update a villa
router.put('/plottingFloral/:id', controller.uploadVillaImage, controller.updateVilla);

module.exports = router;