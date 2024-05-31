import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiniLayout from '../components/MiniLayout';
import { fetchMentorById } from '../api';
import { useAuth } from '../AuthContext';
import profilebanner from '../assets/profilebanner.png'

const years = [2020, 2021, 2022, 2023];

const MentorDashboard = () => {
  const { userId } = useAuth();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleYearClick = (year) => {
    navigate(`/mentees/mentor/${userId}/year/${year}`);
  };

  useEffect(() => {
    const getMentor = async () => {
      try {
        const mentorData = await fetchMentorById(userId);
        setMentor(mentorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentor:', error);
        setLoading(false);
      }
    };

    getMentor();
  }, [userId]);

  if (loading) {
    return (
      <MiniLayout>
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Container>
      </MiniLayout>
    );
  }

  if (!mentor) {
    return (
      <MiniLayout>
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h5" component="div">
            Mentor not found.
          </Typography>
        </Container>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <Container>
        <Card style={{
          marginBottom: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <img
              src={profilebanner} // Replace this with the actual banner image URL
              alt="Profile Banner"
              style={{ width: '100%', height: '23vh', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10vh',
                right: '3rem',
                border: '5px solid white',
                borderRadius: '50%',
                padding: '5px',
                backgroundColor: 'white',
              }}
            >
              <img
                src={mentor.photoLink}
                alt={mentor.name}
                style={{ width: '9rem', height: '9rem', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
          <CardContent style={{padding: '20px'}}>
            <Typography variant="h4" component="div" gutterBottom>
              Welcome! {mentor.name}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Registration Number:</strong> {mentor.registrationNumber}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Year:</strong> {mentor.year}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Email:</strong> {mentor.email}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Role:</strong> {mentor.role}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {years.map((year) => (
            <Grid item xs={12} md={6} lg={3} key={year}>
              <Card
                onClick={() => handleYearClick(year)}
                style={{
                  
                  borderRadius: '0.5rem',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  textAlign: 'center',
                  padding: '0.5rem'
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MiniLayout>
  );
};

export default MentorDashboard;
