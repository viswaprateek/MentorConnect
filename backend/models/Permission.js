const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  menteeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('approval', permissionSchema);
