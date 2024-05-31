import React, { useState } from 'react';
import { Box, Button, TextField, Modal } from '@mui/material';
import { createMeeting } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const MeetingsForm = ({ open, onClose, onMeetingAdded }) => {
  const { userId: mentorId } = useAuth();
  const { menteeId } = useMentee();
  const [meetingData, setMeetingData] = useState({ date: '', time: '', venue: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newMeeting = {
        mentorId,
        menteeId,
        date: meetingData.date,
        time: meetingData.time,
        venue: meetingData.venue,
      };
      const savedMeeting = await createMeeting(newMeeting);
      onMeetingAdded(savedMeeting);
      setMeetingData({ date: '', time: '', venue: '' });
      onClose();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Schedule Meeting</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={meetingData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={meetingData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Venue"
            name="venue"
            value={meetingData.venue}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Schedule
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default MeetingsForm;
