const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const propertyController = require("../Controller/mediaController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/media", upload.single("image"), propertyController.addProperty);
router.get("/media", propertyController.getAllProperties);
router.put("/media/:id", upload.single("image"), propertyController.updateProperty);
router.delete("/media/:id", propertyController.deleteProperty);

module.exports = router;