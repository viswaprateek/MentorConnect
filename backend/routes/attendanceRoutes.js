const express = require('express');
const router = express.Router();
const {getAttendanceByUserId} = require('../controllers/attendanceController');

// Route to get attendance data by UserId
router.get('/:userId', getAttendanceByUserId);

module.exports = router;
