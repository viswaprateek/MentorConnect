const mongoose = require('mongoose');

const MenteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'mentee' },
  password: { type: String, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }, // Reference to Mentor
  photoLink: { type: String }, // Add this line
  phone :{ type:Number },
  class1: {type : String , required: true},
  parentsNames: { type: String },
  parentsOccupation: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String },
  religion: { type: String },
  address: { type: String },
  admissionType: { type: String },
  classesAttended: { type: Number },
  totalClasses: { type: Number },
  sem1Gpa: { type: Number },
  sem2Gpa: { type: Number },
  sem3Gpa: { type: Number },
  sem4Gpa: { type: Number },
  sem5Gpa: { type: Number },
  sem6Gpa: { type: Number },
  sem7Gpa: { type: Number },
  sem8Gpa: { type: Number }
});

module.exports = mongoose.model('Mentee', MenteeSchema);