const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadImage,
  getImages,
  deleteImage,
  updateImage
} = require("../Controller/imageController");

const router = express.Router();

// Custom filename (e.g. hover_1690123456789.jpg)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `hover_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Routes
router.post("/image", upload.single("image"), uploadImage);
router.get("/image", getImages);
router.put("/image/:id", upload.single("image"), updateImage);
router.delete("/image/:id", deleteImage);

module.exports = router;
