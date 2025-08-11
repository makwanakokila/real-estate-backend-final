const PlottingFloral = require('../Model/plottingFloralModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Make sure fs is imported

// --- Multer middleware ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

exports.uploadVillaImage = upload.single('image');

// --- Add new villa ---
exports.addVilla = async (req, res) => {
  try {
    const { bhkType, area, facilities } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    let parsedFacilities = facilities;
    if (typeof facilities === 'string') {
       // On create, it's an array already converted by the form.
       // It gets stringified by buildFormData, so we parse it here.
       parsedFacilities = JSON.parse(facilities);
    }

    const villa = await PlottingFloral.create({
      image,
      bhkType,
      area,
      facilities: parsedFacilities
    });

    res.status(201).json(villa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Get all villas ---
exports.getAllVillas = async (req, res) => {
  try {
    const villas = await PlottingFloral.find();
    res.status(200).json(villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Get villa by ID ---
exports.getVillaById = async (req, res) => {
  try {
    const villa = await PlottingFloral.findById(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.status(200).json(villa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Delete villa ---
exports.deleteVilla = async (req, res) => {
  try {
    const deleted = await PlottingFloral.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Villa not found for deletion' });
    }
     if (deleted.image && fs.existsSync(`uploads/${deleted.image}`)) {
        fs.unlinkSync(`uploads/${deleted.image}`);
    }
    res.status(200).json({ message: 'Deleted successfully', data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Update villa (CORRECTED) ---
exports.updateVilla = async (req, res) => {
  try {
    const villa = await PlottingFloral.findById(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    const { bhkType, area, facilities } = req.body;
    let imagePath = villa.image;

    if (req.file) {
      if (villa.image && fs.existsSync(`uploads/${villa.image}`)) {
        fs.unlinkSync(`uploads/${villa.image}`);
      }
      imagePath = req.file.filename;
    }

    // The facilities data arrives as a JSON string from FormData, so we need to parse it.
    let parsedFacilities = facilities;
    if (typeof facilities === 'string') {
        try {
            parsedFacilities = JSON.parse(facilities);
        } catch (e) {
            // This is a fallback in case it's a simple comma-separated string
            parsedFacilities = facilities.split(',').map(f => f.trim()).filter(Boolean);
        }
    }

    villa.bhkType = bhkType || villa.bhkType;
    villa.area = area || villa.area;
    villa.facilities = parsedFacilities || villa.facilities;
    villa.image = imagePath;

    const updatedVilla = await villa.save();
    res.status(200).json({ message: 'Updated successfully', villa: updatedVilla });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};