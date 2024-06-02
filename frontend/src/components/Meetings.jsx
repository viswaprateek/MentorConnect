import React, { useState, useEffect } from 'react';
import { Button, Container, CircularProgress, Typography } from '@mui/material';
import Layout from '../components/Layout';
import MeetingForm from './MeetingForm';
import MeetingsList from './MeetingsList';
import { getMeetingsByMentee } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';
import { useParams } from 'react-router-dom';

const Meetings = () => {
  const params = useParams();
  const { userRole } = useAuth();
  const { menteeId } = useMentee();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const fetchedMeetings = await getMeetingsByMentee(params.id);
        setMeetings(fetchedMeetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [params.id]);

  const handleMeetingAdded = (newMeeting) => {
    setMeetings([...meetings, newMeeting]);
  };

  const handleMeetingUpdated = (updatedMeeting) => {
    setMeetings(
      meetings.map((meeting) => (meeting._id === updatedMeeting._id ? updatedMeeting : meeting))
    );
  };

  const handleMeetingDeleted = (deletedMeetingId) => {
    setMeetings(meetings.filter((meeting) => meeting._id !== deletedMeetingId));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Meeting Schedules
        </Typography>
        {/* {(userRole === 'mentee' || userRole === 'mentor') && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            style={{ marginBottom: '1.5rem' }}
          >
            Schedule New Meeting
          </Button>
        )} */}
        <MeetingForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          onMeetingAdded={handleMeetingAdded}
        />
        <MeetingsList
          meetings={meetings}
          onMeetingUpdated={handleMeetingUpdated}
          onMeetingDeleted={handleMeetingDeleted}
        />
      </Container>
    </Layout>
  );
};

export default Meetings;
