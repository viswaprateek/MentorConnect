const express = require('express');
const router = express.Router();
const { getMeetings, scheduleMeeting, updateMeeting, deleteMeeting } = require('../controllers/meetingsController');

// Get all meetings for a specific mentee
router.get('/:menteeId', getMeetings);

// Schedule a new meeting
router.post('/', scheduleMeeting);

// Update meeting details (mentor)
router.put('/:id', updateMeeting);

// Delete a meeting
router.delete('/:id', deleteMeeting);

// Schedule a new meeting for multiple mentees
router.post('/multiple', scheduleMeeting);


module.exports = router;
