    const express = require('express');
    const { registerMentor,getMentors ,getMentorById} = require('../controllers/mentorController');
    const router = express.Router();

    router.post('/register', registerMentor);
    router.get('/all', getMentors); 
    router.get('/:id', getMentorById); 

    module.exports = router;
