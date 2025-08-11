const ArchitectureHero = require("../Model/architectureHeroModel");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// ================== Multer Setup ==================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // eg: 169123123123.png
  },
});

const upload = multer({ storage: storage });
// ===================================================

// Add new
const addArchitectureHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const image = req.file.filename;

    const newData = new ArchitectureHero({ image, title, subtitle });
    await newData.save();
    res.status(201).json({ message: "Data added successfully", data: newData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
const getAllArchitectureHero = async (req, res) => {
  try {
    const data = await ArchitectureHero.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete by ID
const deleteArchitectureHero = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ArchitectureHero.findById(id);
    if (!data) return res.status(404).json({ message: "Data not found" }); // Corrected image path to start from the project root

    const imagePath = path.join(__dirname, "../..", "uploads", data.image);

    // Check if the file exists before trying to delete
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await data.deleteOne();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export functions
module.exports = {
  addArchitectureHero,
  getAllArchitectureHero,
  deleteArchitectureHero,
  upload, // exporting multer upload to use in router
};
