const fs = require("fs");
const path = require("path");
const File = require("../Model/fileModel");

// Upload file
exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const file = new File({
    filename: req.file.filename,
   path: `/uploads/${req.file.filename}` // ✅ Fixed here
  });

  await file.save();
  res.json({ message: "File uploaded", file });
};

// Get all files
exports.getFiles = async (req, res) => {
  const files = await File.find().sort({ uploadedAt: -1 });
  res.json(files);
};

// Delete file
exports.deleteFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: "File not found" });

  // Use the correct path to delete the file from the disk
  const filePathToDelete = path.join(__dirname, '..', file.path);
  fs.unlinkSync(filePathToDelete);

  await File.findByIdAndDelete(req.params.id); // delete from DB
  res.json({ message: "File deleted" });
};

// Update file (replace with new)
exports.updateFile = async (req, res) => {
  const oldFile = await File.findById(req.params.id);
  if (!oldFile) return res.status(404).json({ message: "File not found" });

  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  
  // Delete old file from uploads folder using the correct path
  const oldFilePath = path.join(__dirname, '..', oldFile.path);
  fs.unlinkSync(oldFilePath);

  // Update DB with new file info
  oldFile.filename = req.file.filename;
  oldFile.path = `uploads/${req.file.filename}`;
  await oldFile.save();

  res.json({ message: "File updated", file: oldFile });
};
