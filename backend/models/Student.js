const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for subjects
const subjectSchema = new Schema({
    subject: { type: String, required: true },
    internal1: { type: Number, required: true },
    internal2: { type: Number, required: true },
    avgInternal: { type: Number, required: true }
}, { _id: false });

// Define the schema for results
const resultSchema = new Schema({
    semester: { type: Number, required: true },
    subjects: [subjectSchema],
    semesterGPA: { type: Number, required: true }
}, { _id: false });

// Define the schema for students
const studentSchema = new Schema({
    menteeId: { type: mongoose.Types.ObjectId, required: true },
    studentName: { type: String, required: true },
    results: [resultSchema],
    CGPA: { type: Number, required: true }
});

// Create the model from the schema
const Academic = mongoose.model('academics', studentSchema);

module.exports = Academic;
