const express = require("express");
const router = express.Router();
const {
  addInteriorHero,
  getAllInteriorHero,
  deleteInteriorHero,
  upload
} = require("../Controller/interiorHeroController");

// POST
router.post("/interiorHero", upload.single("image"), addInteriorHero);

// GET
router.get("/interiorHero", getAllInteriorHero);

// DELETE
router.delete("/interiorHero/:id", deleteInteriorHero);

module.exports = router;
