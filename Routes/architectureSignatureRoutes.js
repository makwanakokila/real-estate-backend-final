const express = require('express');
const router = express.Router();
const architectureSignatureController = require('../Controller/architectureSignatureController');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `signature-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// Routes
router.post('/architectureSignature', upload.single('image'), architectureSignatureController.addSignature);
router.get('/architectureSignature', architectureSignatureController.getAllSignatures);
router.delete('/architectureSignature/:id', architectureSignatureController.deleteSignature);

module.exports = router;
