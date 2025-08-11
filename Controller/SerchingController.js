const Serching = require('../Model/SerchingModel');
const path = require('path');
const fs = require('fs');

exports.addSerching = async (req, res) => {
  try {
    const { flatOrSchemeName, groupName, location, price, carpetArea, propertyType, floorsRequired, timeline, suggestion } = req.body;
    let image = '';

    if (req.files && req.files['image']) {
      image = `/uploads/${req.files['image'][0].filename}`;
    }

    const serching = new Serching({
      flatOrSchemeName,
      groupName,
      location,
      price: parseFloat(price),
      carpetArea: parseFloat(carpetArea),
      propertyType,
      floorsRequired,
      timeline,
      suggestion,
      image
    });

    const savedSerching = await serching.save();
    res.status(201).json(savedSerching);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSearchings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, propertyType, minCarpetArea, maxCarpetArea, floorsRequired, timeline, flatOrSchemeName } = req.query;
    let query = {};

    // Filter by location (case-insensitive)
    if (location) query.location = new RegExp(location, 'i');
    // Filter by price range
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    // Filter by property type
    if (propertyType) query.propertyType = propertyType;
    // Filter by carpet area range
    if (minCarpetArea || maxCarpetArea) query.carpetArea = {};
    if (minCarpetArea) query.carpetArea.$gte = parseFloat(minCarpetArea);
    if (maxCarpetArea) query.carpetArea.$lte = parseFloat(maxCarpetArea);
    // Filter by floors required
    if (floorsRequired) query.floorsRequired = floorsRequired;
    // Filter by timeline
    if (timeline) query.timeline = timeline;
    // Filter by flat or scheme name (case-insensitive)
    if (flatOrSchemeName) query.flatOrSchemeName = new RegExp(flatOrSchemeName, 'i');

    const searchings = await Serching.find(query).limit(10).sort({ createdAt: -1 }); // Sort by newest first
    if (searchings.length === 0) {
      return res.status(404).json({ message: 'No properties found matching your criteria.' });
    }
    res.json(searchings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSerchingById = async (req, res) => {
  try {
    const serching = await Serching.findById(req.params.id);
    if (!serching) return res.status(404).json({ message: 'Serching not found' });
    res.json(serching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSerching = async (req, res) => {
  try {
    const { flatOrSchemeName, groupName, location, price, carpetArea, propertyType, floorsRequired, timeline, suggestion } = req.body;
    const updateData = {
      flatOrSchemeName,
      groupName,
      location,
      price: parseFloat(price),
      carpetArea: parseFloat(carpetArea),
      propertyType,
      floorsRequired,
      timeline,
      suggestion
    };
    if (req.files && req.files['image']) {
      updateData.image = `/uploads/${req.files['image'][0].filename}`;
      const oldSerching = await Serching.findById(req.params.id);
      if (oldSerching && oldSerching.image) {
        fs.unlinkSync(path.join(__dirname, '..', 'public', oldSerching.image));
      }
    }

    const updatedSerching = await Serching.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updatedSerching) return res.status(404).json({ message: 'Serching not found' });
    res.json(updatedSerching);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSerching = async (req, res) => {
  try {
    const serching = await Serching.findById(req.params.id);
    if (!serching) return res.status(404).json({ message: 'Serching not found' });
    if (serching.image) fs.unlinkSync(path.join(__dirname, '..', 'public', serching.image));
    await Serching.findByIdAndDelete(req.params.id);
    res.json({ message: 'Serching deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};