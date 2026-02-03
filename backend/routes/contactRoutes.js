const express = require("express");
const Contact = require("../models/Contact");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contacts for logged in user
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post("/", protect, async (req, res) => {
  const { name, email, phone, notes } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const contact = await Contact.create({
      user: req.user._id,
      name,
      email,
      phone,
      notes,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to add contact" });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact" });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await contact.deleteOne();
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

module.exports = router;
