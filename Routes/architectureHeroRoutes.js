const express = require("express");
const router = express.Router();
const {
  addArchitectureHero,
  getAllArchitectureHero,
  deleteArchitectureHero,
  upload
} = require("../Controller/architectureHeroController");

// POST
router.post("/architectureHero", upload.single("image"), addArchitectureHero);

// GET
router.get("/architectureHero", getAllArchitectureHero);

// DELETE
router.delete("/architectureHero/:id", deleteArchitectureHero);

module.exports = router;
