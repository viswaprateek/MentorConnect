// ./routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController'); // Corrected import

router.get('/:menteeid', academicController.getAcademicsById); // Corrected method call

module.exports = router;
