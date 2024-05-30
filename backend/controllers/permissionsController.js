const Permission = require('../models/Permission');

// Get all permissions for a specific mentee
const getPermissions = async (req, res) => {
  try {
    console.log()
    const permissions = await Permission.find({ menteeId: req.params.menteeId });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request a new permission (mentee)
const requestPermission = async (req, res) => {
  const { mentorId, menteeId, title, description } = req.body;
  const newPermission = new Permission({
    mentorId,
    menteeId,
    title,
    description,
    status: 'pending',
    date: new Date(),
  });

  try {
    const savedPermission = await newPermission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update permission status (mentor)
const updatePermission = async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPermissions, requestPermission, updatePermission };
