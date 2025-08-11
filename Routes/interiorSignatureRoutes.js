const express = require("express");
const router = express.Router();
const {
  upload,
  addInteriorSignature,
  getAllInteriorSignature,
  deleteInteriorSignature
} = require("../Controller/interiorSignatureController");

// Add new entry
router.post("/interiorSignature", upload.single("image"), addInteriorSignature);

// Get all
router.get("/interiorSignature", getAllInteriorSignature);

// Delete
router.delete("/interiorSignature/:id", deleteInteriorSignature);

module.exports = router;
