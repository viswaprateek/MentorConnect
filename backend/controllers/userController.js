  const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

exports.loginUser = async (req, res) => {
  const { name, password, role, captchaToken } = req.body;
  
  try {
    // Verify CAPTCHA first
    const captchaVerifyURL = 'https://www.google.com/recaptcha/api/siteverify';
    const captchaResponse = await axios({
      url: captchaVerifyURL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken
      })
    });

    console.log('CAPTCHA Response:', captchaResponse.data); // For debugging

    if (!captchaResponse.data.success) {
      return res.status(400).json({ 
        message: 'Invalid CAPTCHA',
        captchaError: captchaResponse.data['error-codes']
      });
    }

    let user;
    if (role === 'mentor') {
      user = await Mentor.findOne({ name });
    } else if (role === 'mentee') {
      user = await Mentee.findOne({ name });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('accessToken', token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ token, id: user._id, role: user.role, name: user.name });
  } catch (error) {
    console.error('Login Error:', error); // For debugging
    res.status(500).json({ 
      message: 'Error logging in', 
      error: error.message,
      details: error.response?.data // Include any error details from Google
    });
  }
};
