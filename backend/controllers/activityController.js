// controllers/ActivityController.js
const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
    try {
        const { menteeId } = req.params;  // Extract menteeId from request parameters
        const activities = await Activity.find({ menteeId });  // Filter activities by menteeId
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.createActivity = async (req, res) => {
    try {
        const { menteeId, name, type, description } = req.body;
        if (!menteeId || !name || !type || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newActivity = new Activity({
            menteeId,
            name,
            type,
            description,
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

