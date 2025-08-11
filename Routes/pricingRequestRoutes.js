const express = require('express');
const router = express.Router();
const controller = require('../Controller/pricingRequestController');

router.post('/pricingRequest', controller.addRequest);
router.get('/pricingRequest', controller.getAllRequests);
router.delete('/pricingRequest/:id', controller.deleteRequest);

module.exports = router;
