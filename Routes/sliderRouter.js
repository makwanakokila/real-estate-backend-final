// sliderRouter.js
const express = require("express");
const router = express.Router();
const sliderController = require("../Controller/sliderController");

router.post("/slider", sliderController.addSlider);
router.get("/slider", sliderController.getSliders);
router.put("/slider/:id", sliderController.updateSlider);
router.delete("/slider/:id", sliderController.deleteSlider);

module.exports = router;