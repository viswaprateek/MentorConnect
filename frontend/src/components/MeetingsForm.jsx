import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createMeeting } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';

const MeetingsForm = ({ menteeIds, onMeetingAdded }) => {
  const { userId: mentorId } = useAuth();
  const { menteeId } = useMentee();
  const [meetingData, setMeetingData] = useState({ date: '', time: '', venue: '' });
  const [show, setShow] = useState(true);
  const [confirmProceed, setConfirmProceed] = useState(false); // State to handle confirmation

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const handleConfirmProceed = () => {
    setConfirmProceed(true); // Set confirmation to true
    setShow(true); // Open the modal after confirmation
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const meetingsPromises = menteeIds.map(async (menteeId) => {
        const newMeeting = {
          mentorId,
          menteeId,
          date: meetingData.date,
          time: meetingData.time,
          venue: meetingData.venue,
        };
        return await createMeeting(newMeeting);
      });

      const savedMeetings = await Promise.all(meetingsPromises);
      onMeetingAdded(savedMeetings);
      setMeetingData({ date: '', time: '', venue: '' });
      handleClose();
    } catch (error) {
      console.error('Error scheduling meetings:', error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setConfirmProceed(false); // Reset confirmation state
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Meeting</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="meetingDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={meetingData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="meetingTime" className="mt-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={meetingData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="meetingVenue" className="mt-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                name="venue"
                value={meetingData.venue}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Schedule
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    
    </>
  );
};

export default MeetingsForm;
