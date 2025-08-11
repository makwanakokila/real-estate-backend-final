const express = require('express');
const router = express.Router();
const controller = require('../Controller/plottingController');

router.post('/plotting', controller.uploadPlottingImage, controller.addPlotting);
router.get('/plotting', controller.getAllPlotting);
router.delete('/plotting/:id', controller.deletePlotting);
router.put('/plotting/:id', controller.uploadPlottingImage, controller.updatePlotting);

module.exports = router;
