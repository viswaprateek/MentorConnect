// models/NonAcademicActivity.js
const mongoose = require('mongoose');

const nonAcademicActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Activity', nonAcademicActivitySchema, 'nonacademicactivities');
