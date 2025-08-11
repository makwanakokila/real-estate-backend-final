const ArchitectureSignature = require("../Model/architectureSignatureModel");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Multer setup (already correct in your router)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `signature-${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage });

// Add Architecture Signature
exports.addSignature = async (req, res) => {
  try {
    const { projectName, location } = req.body;
    const image = req.file?.filename;

    if (!image || !projectName || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const signature = new ArchitectureSignature({
      image,
      projectName,
      location,
    });

    await signature.save();
    res
      .status(201)
      .json({ message: "Signature added successfully", signature });
  } catch (error) {
    res.status(500).json({ message: "Error adding signature", error });
  }
};

// Get All
exports.getAllSignatures = async (req, res) => {
  try {
    const data = await ArchitectureSignature.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching signatures", error });
  }
};

// Delete
exports.deleteSignature = async (req, res) => {
  try {
    const { id } = req.params;
    const signature = await ArchitectureSignature.findById(id);

    if (!signature) {
      return res.status(404).json({ message: "Signature not found" });
    } // Corrected image path to start from the project root

    const imagePath = path.join(__dirname, "../..", "uploads", signature.image);

    // Check if the file exists before trying to delete
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await ArchitectureSignature.findByIdAndDelete(id);
    res.status(200).json({ message: "Signature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting signature", error });
  }
};

// Export routes
module.exports = {
  addSignature: exports.addSignature,
  getAllSignatures: exports.getAllSignatures,
  deleteSignature: exports.deleteSignature,
  upload: upload, // Export the upload middleware
};
