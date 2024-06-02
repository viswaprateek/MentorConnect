import React, { useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { createMeeting } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';
import { FaPlus } from 'react-icons/fa';

const MeetingsForm = ({ onMeetingAdded }) => {
  const { userId: mentorId } = useAuth();
  const { menteeId } = useMentee();
  const [meetingData, setMeetingData] = useState({ date: '', time: '', venue: '' });
  const [show, setShow] = useState(false);

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
      handleClose();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card 
        style={{ 
          width: '200px', 
          height: '200px', 
          border: '2px dotted #000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer', 
          margin: 'auto' 
        }} 
        onClick={handleShow}
      >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <FaPlus style={{ fontSize: '40px' }} />
        </Card.Body>
      </Card>

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
            <Button type="submit" variant="primary"> (viswa add functionality to this)
              Schedule
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MeetingsForm;
