const express = require('express');
const { loginUser } = require('../controllers/userController');
const { registerMentee } = require('../controllers/menteeController');
const { registerMentor } = require('../controllers/mentorController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register/mentee', registerMentee);
router.post('/register/mentor', registerMentor);

module.exports = router;
