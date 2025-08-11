const fs = require("fs");
const Image = require("../Model/imageModel");

// Upload image
exports.uploadImage = async (req, res) => {
  const { builderGroup } = req.body;

  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  if (!builderGroup) return res.status(400).json({ message: "Builder group is required" });

  const image = new Image({
    filename: req.file.filename,
    path: req.file.path,
    builderGroup
  });

  await image.save();
  res.json({
    message: "Image uploaded successfully",
    image
  });
};

// Get all images
exports.getImages = async (req, res) => {
  const images = await Image.find().sort({ uploadedAt: -1 });
  res.json(images);
};

// Delete image
exports.deleteImage = async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ message: "Image not found" });

  fs.unlinkSync(image.path);
  await Image.findByIdAndDelete(req.params.id);
  res.json({ message: "Image deleted" });
};

// Update image
exports.updateImage = async (req, res) => {
  const { builderGroup } = req.body;

  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ message: "Image not found" });

  if (req.file) {
    fs.unlinkSync(image.path); // delete old file
    image.filename = req.file.filename;
    image.path = req.file.path;
  }

  if (builderGroup) image.builderGroup = builderGroup;

  await image.save();
  res.json({ message: "Image updated", image });
};
