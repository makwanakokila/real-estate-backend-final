const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require('fs'); // Make sure to import fs
const {
  uploadFile,
  getFiles,
  deleteFile,
  updateFile
} = require("../Controller/uploadController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Corrected path to point directly to the uploads folder
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/upload", getFiles);
router.put("/upload/:id", upload.single("file"), updateFile);
router.delete("/upload/:id", deleteFile);

module.exports = router;
