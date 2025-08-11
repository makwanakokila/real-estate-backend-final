// const Plotting = require('../Model/plottingModel');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // === Multer Setup ===
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage, fileFilter });
// exports.uploadPlottingImage = upload.single('image');

// // === Add Plotting === //

// exports.addPlotting = async (req, res) => {
//   try {
//     const { title, subtitle } = req.body;
//     const image = req.file?.path;

//     if (!title || !subtitle || !image) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const plotting = await Plotting.create({ title, subtitle, image });
//     res.status(201).json({ message: 'Added successfully', plotting });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // === Get All ===
// exports.getAllPlotting = async (req, res) => {
//   try {
//     const data = await Plotting.find().sort({ createdAt: -1 });
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // === Delete ===
// exports.deletePlotting = async (req, res) => {
//   try {
//     const plotting = await Plotting.findByIdAndDelete(req.params.id);
//     if (!plotting) return res.status(404).json({ message: 'Not found' });

//     if (fs.existsSync(plotting.image)) fs.unlinkSync(plotting.image);

//     res.status(200).json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // === Update ===
// exports.updatePlotting = async (req, res) => {
//   try {
//     const plotting = await Plotting.findById(req.params.id);
//     if (!plotting) return res.status(404).json({ message: 'Not found' });

//     const { title, subtitle } = req.body;
//     let imagePath = plotting.image;

//     if (req.file) {
//       if (fs.existsSync(plotting.image)) fs.unlinkSync(plotting.image);
//       imagePath = req.file.path;
//     }

//     plotting.title = title || plotting.title;
//     plotting.subtitle = subtitle || plotting.subtitle;
//     plotting.image = imagePath;

//     await plotting.save();
//     res.status(200).json({ message: 'Updated successfully', plotting });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const Plotting = require('../Model/plottingModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create Uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// === Multer Setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const extValid = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowed.test(file.mimetype);
  if (extValid && mimeValid) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter });
exports.uploadPlottingImage = upload.single('image');

// === Add Plotting ===
exports.addPlotting = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const image = req.file?.path;
    console.log('Uploaded file path:', image);

    if (!title || !subtitle || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const plotting = await Plotting.create({ title, subtitle, image });
    res.status(201).json({ message: 'Added successfully', plotting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Get All ===
exports.getAllPlotting = async (req, res) => {
  try {
    const data = await Plotting.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Delete ===
exports.deletePlotting = async (req, res) => {
  try {
    const plotting = await Plotting.findByIdAndDelete(req.params.id);
    if (!plotting) return res.status(404).json({ message: 'Not found' });

    if (fs.existsSync(plotting.image)) fs.unlinkSync(plotting.image);

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Update ===
exports.updatePlotting = async (req, res) => {
  try {
    const plotting = await Plotting.findById(req.params.id);
    if (!plotting) return res.status(404).json({ message: 'Not found' });

    const { title, subtitle } = req.body;
    let imagePath = plotting.image;

    if (req.file) {
      if (fs.existsSync(plotting.image)) fs.unlinkSync(plotting.image);
      imagePath = req.file.path;
      console.log('Updated file path:', imagePath);
    }

    plotting.title = title || plotting.title;
    plotting.subtitle = subtitle || plotting.subtitle;
    plotting.image = imagePath;

    await plotting.save();
    res.status(200).json({ message: 'Updated successfully', plotting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};