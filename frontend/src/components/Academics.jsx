import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAcedamicsByUserId } from '../api'; // Ensure the path is correct
import { useMentee } from '../MenteeContext';
import Layout from './Layout';

import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const Academics = () => {
  const { menteeId } = useMentee();
  const params = useParams();
  const [academicDetails, setAcademicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await getAcedamicsByUserId(params.id);
        setAcademicDetails(response);
      } catch (error) {
        setError('Failed to fetch academic details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAcademicDetails();
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </Layout>
    );
  }

  if (!academicDetails) {
    return (
      <Layout>
        <Container sx={{ textAlign: 'center', marginTop: 5 }}>
          <Typography>No academic details available.</Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Academic Details
        </Typography>
        {academicDetails.map((academicDetail, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Mentee: {academicDetail.studentName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              CGPA: {academicDetail.CGPA}
            </Typography>
            {academicDetail.results && academicDetail.results.map((result, resultIndex) => (
              <Box key={resultIndex} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Semester {result.semester}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Semester GPA: {result.semesterGPA}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Internal 1</TableCell>
                        <TableCell>Internal 2</TableCell>
                        <TableCell>Avg Internal</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.subjects.map((subject, subIndex) => (
                        <TableRow key={subIndex}>
                          <TableCell>{subject.subject}</TableCell>
                          <TableCell>{subject.internal1}</TableCell>
                          <TableCell>{subject.internal2}</TableCell>
                          <TableCell>{subject.avgInternal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export default Academics;
