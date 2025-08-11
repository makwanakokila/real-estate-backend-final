const Inquiry = require("../Model/inquiryModel");

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Manual validation
    if (!name || name.length < 3) return res.status(400).json({ error: "Name must be at least 3 characters." });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return res.status(400).json({ error: "Invalid email." });
    if (phone && !/^\d{10}$/.test(phone)) return res.status(400).json({ error: "Phone number must be 10 digits." });
    if (!message || message.trim().length === 0) return res.status(400).json({ error: "Message is required." });
    // if (!projectId) return res.status(400).json({ error: "Project ID is required." });

    const inquiry = await Inquiry.create({ name, email, phone, message });
    res.status(201).json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
};

exports.deleteInquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });
    res.json({ success: true, message: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};