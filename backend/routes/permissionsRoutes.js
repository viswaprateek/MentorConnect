const express = require('express');
const router = express.Router();
const { getPermissions, requestPermission, updatePermission } = require('../controllers/permissionsController');

// Get all permissions for a specific mentee
router.get('/:menteeId', getPermissions);

// Request a new permission (mentee)
router.post('/', requestPermission);

// Update permission status (mentor)
router.put('/:id', updatePermission);

module.exports = router;
