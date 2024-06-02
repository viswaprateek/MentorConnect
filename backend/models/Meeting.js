const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  menteeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  mom: { type: String },
  remarks: { type: String },
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
});

module.exports = mongoose.model('Meeting', meetingSchema);
