const InteriorSignature = require("../Model/interiorSignatureModel");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add New Entry
const addInteriorSignature = async (req, res) => {
  try {
    const { propertyName, location } = req.body;
    const image = req.file.filename;

    const newData = new InteriorSignature({ image, propertyName, location });
    await newData.save();
    res.status(201).json({ message: "Data added successfully", data: newData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
const getAllInteriorSignature = async (req, res) => {
  try {
    const data = await InteriorSignature.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete by ID
const deleteInteriorSignature = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await InteriorSignature.findById(id);
    if (!data) return res.status(404).json({ message: "Data not found" }); // ✅ Corrected path to navigate up two levels

    const imagePath = path.join(__dirname, "../..", "uploads", data.image);

    // Check if the file exists before trying to delete
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`File not found at: ${imagePath}. Skipping deletion.`);
    }

    await data.deleteOne();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  upload,
  addInteriorSignature,
  getAllInteriorSignature,
  deleteInteriorSignature,
};
