const media = require("../Model/mediaModel");
const fs = require("fs");

exports.addProperty = async (req, res) => {
  try {
    const { title, description, subtitle } = req.body;
    const image = req.file;

    const newProperty = new media({
      title,
      description,
      subtitle,
      image: {
        filename: image.filename,
        path: image.path
      }
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await media.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subtitle } = req.body;

    const updateData = { title, description, subtitle };

    if (req.file) {
      updateData.image = {
        filename: req.file.filename,
        path: req.file.path
      };
    }

    const updated = await media.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await media.findById(id); // ✅ use a different name

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property?.image?.path && fs.existsSync(property.image.path)) {
      fs.unlinkSync(property.image.path); // safely delete image
    }

    await media.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
