import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Avatar, Box, Divider } from '@mui/material';
import { getMenteeById } from '../api';
import { useMentee } from '../MenteeContext';
import Layout from './Layout';
import { useParams } from 'react-router-dom';


const MenteeDashboard = () => {
  const {id}=useParams();
  const { menteeId } = useMentee();
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const fetchedMentee = await getMenteeById(id);
        setMentee(fetchedMentee);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentee with ID ${menteeId}:`, error);
        setLoading(false);
      }
    };

      fetchMentee();
    
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }
  console.log(mentee)


  if (!mentee) {
    return <Typography variant="h6">Mentee not found</Typography>;
  }

  return (
    <Layout>
      <Container>
        <Card sx={{ boxShadow: 3, mb: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {mentee.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Registration Number: {mentee.registrationNumber}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Phone : {mentee.phone}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Email: {mentee.email}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Year: {mentee.year}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Role: {mentee.role}
                </Typography>
              </Box>
              <Avatar src={mentee.photoLink} alt={`${mentee.name}'s profile`} sx={{ width: 150, height: 150, boxShadow: 5 }} />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Personal Information
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Parents' Names: {mentee.parentsNames}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Parents' Occupation: {mentee.parentsOccupation}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Blood Group: {mentee.bloodGroup}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nationality: {mentee.nationality}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Religion: {mentee.religion}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Address: {mentee.address}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Admission Type: {mentee.admissionType}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Academic Information
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Classes Attended: {mentee.classesAttended}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Total Classes: {mentee.totalClasses}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" component="div" gutterBottom>
                      GPA Details
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 1 GPA: {mentee.sem1Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 2 GPA: {mentee.sem2Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 3 GPA: {mentee.sem3Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 4 GPA: {mentee.sem4Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 5 GPA: {mentee.sem5Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 6 GPA: {mentee.sem6Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 7 GPA: {mentee.sem7Gpa}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Semester 8 GPA: {mentee.sem8Gpa}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default MenteeDashboard;
