const Mentee = require('../models/Mentee');
const Mentor = require('../models/Mentor');
const bcrypt = require('bcryptjs');

exports.registerMentee = async (req, res) => {
  const {
    name,
    year,
    registrationNumber,
    email,
    role,
    password,
    mentorName,
    mentorRegistrationNumber,
    parentsNames,
    parentsOccupation,
    phone,
    class1,
    bloodGroup,
    nationality,
    religion,
    address,
    admissionType,
    classesAttended,
    totalClasses,
    sem1Gpa,
    sem2Gpa,
    sem3Gpa,
    sem4Gpa,
    sem5Gpa,
    sem6Gpa,
    sem7Gpa,
    sem8Gpa,
    photoLink // Add this line
  } = req.body;

  try {
    const menteeExists = await Mentee.findOne({ email });
    if (menteeExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const mentor = await Mentor.findOne({ registrationNumber: mentorRegistrationNumber });
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const hashedPassword = await bcrypt.hash('vnrvjiet', 10);

    const mentee = new Mentee({
      name,
      year,
      registrationNumber,
      email,
      role,
      password: hashedPassword,
      mentor: mentor._id,
      parentsNames,
      parentsOccupation,
      phone,
      class1,
      bloodGroup,
      nationality,
      religion,
      address,
      admissionType,
      classesAttended,
      totalClasses,
      sem1Gpa,
      sem2Gpa,
      sem3Gpa,
      sem4Gpa,
      sem5Gpa,
      sem6Gpa,
      sem7Gpa,
      sem8Gpa,
      photoLink // Include this line
    });

    await mentee.save();
    res.status(201).json({ message: 'Mentee registered successfully' });
  } catch (error) {
    console.error('Error registering mentee:', error);
    res.status(500).json({ message: 'Error registering mentee', error: error.message });
  }
};

// exports.getMenteesByYear = async (req, res) => {
//   const { year } = req.params;

//   try {
//     const mentees = await Mentee.find({ year });
//     res.status(200).json(mentees);
//   } catch (error) {
//     console.error('Error fetching mentees by year:', error);
//     res.status(500).json({ message: 'Error fetching mentees', error: error.message });
//   }
// };

exports.getMenteesByMentorAndYear = async (req, res) => {
  const { mentorId, year } = req.params;

  try {
    const mentees = await Mentee.find({ mentor: mentorId, year });
    res.status(200).json(mentees);
  } catch (error) {
    console.error('Error fetching mentees by mentor and year:', error);
    res.status(500).json({ message: 'Error fetching mentees', error: error.message });
  }
};


exports.getMenteeById = async (req, res) => {
  const { id } = req.params;

  try {
    const mentee = await Mentee.findById(id);
    if (!mentee) {
      return res.status(404).json({ message: 'Mentee not found' });
    }
    res.status(200).json(mentee);
  } catch (error) {
    console.error('Error fetching mentee:', error);
    res.status(500).json({ message: 'Error fetching mentee', error: error.message });
  }
};


exports.changePassword = async (req, res) => {
  const { id } = req.params; // ID from params
  const { currentPassword, newPassword, role } = req.body; // Include role in the request body

  try {
    let user;
    if (role === 'mentee') {
      user = await Mentee.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Mentee not found' });
      }
    } else if (role === 'mentor') {
      user = await Mentor.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (role === 'mentee') {
      await Mentee.updateOne({ _id: id }, { password: hashedPassword });
    } else if (role === 'mentor') {
      await Mentor.updateOne({ _id: id }, { password: hashedPassword });
    }

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};