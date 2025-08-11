


const Contact = require('../Model/Contact');

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, natureOfEnquiry } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !natureOfEnquiry) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({
      fullName,
      email,
      phone,
      natureOfEnquiry,
    });

    const savedContact = await contact.save();
    res.status(201).json({ message: 'Form submitted successfully', data: savedContact });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: 'Contacts fetched successfully', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully', data: deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

