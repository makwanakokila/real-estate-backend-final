const Team = require("../Model/teamModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `team-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).single("image");

// Add team member
exports.addTeam = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const { title } = req.body;
      if (!req.file || !title) {
        // Ensure both image and title are present
        return res.status(400).json({ success: false, message: "Both title and image are required." });
      }

      const team = await Team.create({ title, image: req.file.filename });
      res.status(201).json({ success: true, data: team });
    } catch (err) {
      console.error("Error adding team member:", err);
      // Clean up the uploaded file if database save fails
      if (req.file) {
        fs.unlinkSync(path.join("uploads", req.file.filename));
      }
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Get all team members
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json({ success: true, data: team });
  } catch (err) {
    console.error("Error getting team members:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update team member
exports.updateTeam = (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    try {
      const { id } = req.params;
      const { title } = req.body;

      const existing = await Team.findById(id);
      if (!existing) return res.status(404).json({ success: false, message: "Team member not found" });

      const updateData = {};
      if (title) updateData.title = title;
      if (req.file) {
        // Delete old image if a new one is uploaded
        if (existing.image) {
          const oldImagePath = path.join("uploads", existing.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = req.file.filename;
      }

      const updated = await Team.findByIdAndUpdate(id, updateData, { new: true });
      res.json({ success: true, data: updated });
    } catch (err) {
      console.error("Error updating team member:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// Delete team member
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);

    if (!team) return res.status(404).json({ success: false, message: "Team member not found" });

    // Delete the image file
    if (team.image) {
      const imagePath = path.join("uploads", team.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ success: true, message: "Team member deleted successfully" });
  } catch (err) {
    console.error("Error deleting team member:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};