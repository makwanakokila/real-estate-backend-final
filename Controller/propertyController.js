
const Property = require('../Model/propertyModel');

// Create (Admin)
exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update (Admin)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete (Admin)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get (User with filters)
exports.getProperties = async (req, res) => {
  try {
    const filters = {};

    if (req.query.location) filters.location = req.query.location.toLowerCase();
    if (req.query.propertyType) filters.propertyType = req.query.propertyType;
    if (req.query.floorsRequired) filters.floorsRequired = req.query.floorsRequired;
    if (req.query.projectTimeline) filters.projectTimeline = req.query.projectTimeline;

    if (req.query.minPrice && req.query.maxPrice) {
      filters['priceRange.min'] = { $gte: +req.query.minPrice };
      filters['priceRange.max'] = { $lte: +req.query.maxPrice };
    }

    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

