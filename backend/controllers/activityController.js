// controllers/ActivityController.js
const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createActivity = async (req, res) => {
    const { name, type, description } = req.body;
    const activity = new Activity({
        name,
        type,
        description,
    });

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

