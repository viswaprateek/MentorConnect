const Attendance = require('../models/Attendance');

exports.getAttendanceByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const attendance = await Attendance.find({ UserId: userId });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
