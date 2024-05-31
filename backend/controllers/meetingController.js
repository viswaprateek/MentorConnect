const Meeting = require('../models/Meeting'); // Adjust the path as necessary

// Create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    const newMeeting = new Meeting({
      menteeObj: req.body.menteeObj,
      mentorObj: req.body.mentorObj,
      date: new Date(req.body.date),
      time: req.body.time,
      venue: req.body.venue,
      MOM: req.body.MOM,
      duration: req.body.duration,
      Remarks: req.body.Remarks
    });

    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();  /mentor
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a meeting by ID
exports.updateMeetingById = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        menteeObj: req.body.menteeObj,
        mentorObj: req.body.mentorObj,
        date: new Date(req.body.date),
        time: req.body.time,
        venue: req.body.venue,
        MOM: req.body.MOM,
        duration: req.body.duration,
        Remarks: req.body.Remarks
      },
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a meeting by ID
exports.deleteMeetingById = async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
