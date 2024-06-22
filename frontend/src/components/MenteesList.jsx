import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';
import { getMenteesByMentorAndYear } from '../api';
import MiniLayout from './MiniLayout';
import { useMentee } from '../MenteeContext';
import { useAuth } from '../AuthContext';
import MeetingsForm from './MeetingsForm';
import MenteesCard from './MenteesCard';
import ConfirmationModal from './ConfirmationModal'; // Import ConfirmationModal component
import './MenteesList.css';

const MenteesList = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const { setMenteeId, selectedMenteeIds, setSelectedMenteeIds } = useMentee(); // Use selectedMenteeIds from context
  const { userId: mentorId } = useAuth();
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMeetingsForm, setShowMeetingsForm] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const yearMentees = await getMenteesByMentorAndYear(mentorId, year);
        setMentees(yearMentees);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentees for mentor ${mentorId} and year ${year}:`, error);
        setLoading(false);
      }
    };

    if (mentorId && year) {
      fetchMentees();
    }
  }, [mentorId, year]);

  const handleCheckboxChange = (menteeId) => {
    setSelectedMenteeIds((prevSelected) =>
      prevSelected.includes(menteeId)
        ? prevSelected.filter((id) => id !== menteeId)
        : [...prevSelected, menteeId]
    );
  };

  const handleScheduleMeeting = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmScheduleMeeting = () => {
    setShowMeetingsForm(true); // Show the meetings form
    setShowModal(false); // Hide the confirmation modal
  };

  const handleMeetingAdded = () => {
    setShowMeetingsForm(false);
    setSelectedMenteeIds([]);
  };

  const handleViewMentee = (menteeId) => {
    setMenteeId(menteeId); // Store the mentee ID in context
    navigate(`/menteedashboard/${menteeId}`);
  };

  if (loading) {
    return (
      <MiniLayout>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </Container>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <Container>
        {mentees.length === 0 ? (
          <h5 className="text-center my-5">No mentees present.</h5>
        ) : (
          <>
            <Row>
              {mentees.map((mentee) => (
                <Col key={mentee._id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
                  <MenteesCard
                    mentee={mentee}
                    onCheckboxChange={handleCheckboxChange}
                    onViewMentee={handleViewMentee}
                  />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center my-4">
              <Button 
                onClick={handleScheduleMeeting} 
                disabled={selectedMenteeIds.length === 0}
              >
                Schedule Meeting for Selected
              </Button>
            </div>
          </>
        )}
        {showMeetingsForm && (
          <MeetingsForm menteeIds={selectedMenteeIds} onMeetingAdded={handleMeetingAdded} />
        )}
        <ConfirmationModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={handleConfirmScheduleMeeting}
          message="Are you sure you want to schedule a meeting for the selected mentees?"
        />
      </Container>
    </MiniLayout>
  );
};

export default MenteesList;
