const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.loginUser = async (req, res) => {
  const { name, password, role } = req.body; // Accept role in the request
  try {
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
    res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ token, id: user._id, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
