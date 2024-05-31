const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Mentee' },
  OScode: { type: String, required: true },
  OSattended: { type: Number, required: true },
  OStotalClasses: { type: Number, required: true },
  COcode: { type: String, required: true },
  COattended: { type: Number, required: true },
  COtotalClasses: { type: Number, required: true },
  DAAcode: { type: String, required: true },
  DAAattended: { type: Number, required: true },
  DAAtotalClasses: { type: Number, required: true },
  SEcode: { type: String, required: true },
  SEattended: { type: Number, required: true },
  SEtotalClasses: { type: Number, required: true },
  EEAcode: { type: String, required: true },
  EEAattended: { type: Number, required: true },
  EEAtotalClasses: { type: Number, required: true },
  IPRcode: { type: String, required: true },
  IPRattended: { type: Number, required: true },
  IPRtotalClasses: { type: Number, required: true },
  WADcode: { type: String, required: true },
  WADattended: { type: Number, required: true },
  WADtotalClasses: { type: Number, required: true },
  SELABcode: { type: String, required: true },
  SELABattended: { type: Number, required: true },
  SELABtotalClasses: { type: Number, required: true },
  OSLABcode: { type: String, required: true },
  OSLABattended: { type: Number, required: true },
  OSLABtotalClasses: { type: Number, required: true },
  FPcode: { type: String, required: true },
  FPattended: { type: Number, required: true },
  FPtotalClasses: { type: Number, required: true },
  TotalSemClasses: { type: Number, required: true },

});

const Attendance = mongoose.model('attendance', attendanceSchema);

module.exports = Attendance;
