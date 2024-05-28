const express = require('express');
const { registerMentee, getMenteesByMentorAndYear, getMenteeById, changePassword } = require('../controllers/menteeController');
const router = express.Router();

router.post('/register', registerMentee);
router.get('/mentor/:mentorId/year/:year', getMenteesByMentorAndYear); // Updated route
router.get('/:id', getMenteeById);
router.put('/changepassword/:id', changePassword); // New route for changing password


module.exports = router;
