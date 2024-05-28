import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiniLayout from '../components/MiniLayout';
import { fetchMentorById } from '../api'; // Import the API function
import { useAuth } from '../AuthContext'; // Import useAuth to get user information

const years = [2020, 2021, 2022, 2023]; // You might fetch this dynamically

const MentorDashboard = () => {
  const { userId } = useAuth(); // Access userId from AuthContext
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
        <Container>
          <CircularProgress />
        </Container>
      </MiniLayout>
    );
  }

  if (!mentor) {
    return (
      <MiniLayout>
        <Container>
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
        <Card>
          <CardContent style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden' , boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)'}}>
              <img src={mentor.photoLink} alt={mentor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <Typography variant="h5" component="div">
              Welcome! {mentor.name}
            </Typography>
            <Typography variant="body1" component="div">
              Registration Number: {mentor.registrationNumber} 
            </Typography>
            <Typography variant="body1" component="div">
              Year: {mentor.year}
            </Typography>
            <Typography variant="body1" component="div">
              Email: {mentor.email}
            </Typography>
            <Typography variant="body1" component="div">
              Role: {mentor.role}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {years.map((year) => (
            <Grid item xs={12} key={year}>
              <Card onClick={() => handleYearClick(year)}>
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
