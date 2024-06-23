const express = require('express');
const router = express.Router();
const nonAcademicActivityController = require('../controllers/activityController');

router.get('/:menteeId', nonAcademicActivityController.getActivities);
router.post('/', nonAcademicActivityController.createActivity);

module.exports = router;
