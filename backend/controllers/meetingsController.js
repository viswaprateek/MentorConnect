const Meeting = require('../models/Meeting');

// Get all meetings for a specific mentee
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ menteeId: req.params.menteeId });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Schedule a new meeting
const scheduleMeeting = async (req, res) => {
  const { mentorId, menteeId, date, time, venue } = req.body;
  const newMeeting = new Meeting({
    mentorId,
    menteeId,
    date,
    time,
    venue,
    status: 'upcoming',
  });

  try {
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update meeting details (mentor)
const updateMeeting = async (req, res) => {
  const updateFields = req.body;
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Schedule meetings for multiple mentees
const scheduleMultipleMeeting = async (req, res) => {
  const { mentorId, date, time, venue } = req.body;
  const { menteeIds } = req.body;

  try {
    const meetings = menteeIds.map(async (menteeId) => {
      const newMeeting = new Meeting({
        mentorId,
        menteeId,
        date,
        time,
        venue,
        status: 'upcoming',
      });
      return await newMeeting.save();
    });

    const savedMeetings = await Promise.all(meetings);
    res.status(201).json(savedMeetings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { scheduleMeeting };


module.exports = { getMeetings, scheduleMeeting, updateMeeting, deleteMeeting, scheduleMultipleMeeting };


