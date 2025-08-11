const PricingRequest = require('../Model/pricingRequestModel');

// Add new pricing request
exports.addRequest = async (req, res) => {
  try {
    const { propertyType, fullName, email, phone } = req.body;

    const newRequest = await PricingRequest.create({
      propertyType, fullName, email, phone
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all pricing requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await PricingRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete request by ID
exports.deleteRequest = async (req, res) => {
  try {
    const deleted = await PricingRequest.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Deleted successfully', data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
