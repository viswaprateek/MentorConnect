const Mentor = require('../models/Mentor');
const bcrypt = require('bcryptjs');

exports.registerMentor = async (req, res) => {
  const { name, year, registrationNumber, email, role, photoLink } = req.body;

  try {
    if (!name || !year || !registrationNumber || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const mentorExists = await Mentor.findOne({ email });
    if (mentorExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash('vnrvjiet', 10);

    const mentor = new Mentor({
      name,
      year,
      registrationNumber,
      email,
      role,
      password: hashedPassword,
      photoLink // Include this line
    });

    await mentor.save();
    res.status(201).json({ message: 'Mentor registered successfully' });
  } catch (error) {
    console.error('Error registering mentor:', error);
    res.status(500).json({ message: 'Error registering mentor', error: error.message });
  }
};

// Other imports and code...

exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Error fetching mentors', error: error.message });
  }
};

exports.getMentorById = async (req, res) => {
  const mentorId = req.params.id;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.status(200).json(mentor);
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ message: 'Error fetching mentor', error: error.message });
  }
};

