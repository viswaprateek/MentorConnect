const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes =require('./routes/attendanceRoutes')
const menteeRoutes = require('./routes/menteeRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const permissionRoutes=require('./routes/permissionsRoutes')
const meetingsRoutes=require('./routes/meetingsRoutes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/user-api/auth', userRoutes);


app.use('/mentees', menteeRoutes);
app.use('/mentors', mentorRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/permissions', permissionRoutes);
app.use('/meetings',meetingsRoutes)




module.exports = app;
