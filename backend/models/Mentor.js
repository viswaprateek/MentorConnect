const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'mentor' },
  password: { type: String, required: true }, // Ensure this line is included
  photoLink: { type: String } // Add this line

});

module.exports = mongoose.model('Mentor', MentorSchema);
