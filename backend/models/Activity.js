const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const nonAcademicActivitySchema = new mongoose.Schema({
    menteeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mentee'
    },
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
    pdfPath: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('NonAcademicActivity', nonAcademicActivitySchema, 'nonacademicactivities');
