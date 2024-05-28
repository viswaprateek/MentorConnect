import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { registerMentee, registerMentor } from '../api'; // Import the API functions
import axios from 'axios';

const AdminDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    year: '',
    registrationNumber: '',
    email: '',
    role: 'mentee',
    parentsNames: '',
    parentsOccupation: '',
    phone: '',
    class1: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    address: '',
    admissionType: '',
    classesAttended: '',
    totalClasses: '',
    sem1Gpa: '',
    sem2Gpa: '',
    sem3Gpa: '',
    sem4Gpa: '',
    sem5Gpa: '',
    sem6Gpa: '',
    sem7Gpa: '',
    sem8Gpa: '',
    mentorName: '',
    mentorRegistrationNumber: '',
    photoFile: null, // Change photoLink to photoFile
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      photoFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoLink = '';
      if (userDetails.photoFile) {
        const formData = new FormData();
        formData.append('file', userDetails.photoFile);
        formData.append('upload_preset', 'x5gcrzk2'); // Replace with your Cloudinary upload preset
        const response = await axios.post(
          
          'https://api.cloudinary.com/v1_1/dtubfmvvq/image/upload', // Replace with your Cloudinary cloud name
          formData
        );
        photoLink = response.data.secure_url;
      }

      const userDetailsWithPhoto = {
        ...userDetails,
        photoLink, // Add photoLink to the user details
      };

      if (userDetails.role === 'mentee') {
        await registerMentee(userDetailsWithPhoto);
      } else {
        await registerMentor(userDetailsWithPhoto);
      }
      alert('User registered successfully');
      setUserDetails({
        name: '',
        year: '',
        registrationNumber: '',
        email: '',
        role: 'mentee',
        parentsNames: '',
        parentsOccupation: '',
        phone: '',
        class1: '',
        bloodGroup: '',
        nationality: '',
        religion: '',
        address: '',
        admissionType: '',
        classesAttended: '',
        totalClasses: '',
        sem1Gpa: '',
        sem2Gpa: '',
        sem3Gpa: '',
        sem4Gpa: '',
        sem5Gpa: '',
        sem6Gpa: '',
        sem7Gpa: '',
        sem8Gpa: '',
        mentorName: '',
        mentorRegistrationNumber: '',
        photoFile: null, // Reset this field as well
      }); // Reset form
    } catch (error) {
      console.error('Failed to register user:', error);
      alert('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={userDetails.role}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value="mentee">Mentee</MenuItem>
                  <MenuItem value="mentor">Mentor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Year"
                name="year"
                value={userDetails.year}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Registration Number"
                name="registrationNumber"
                value={userDetails.registrationNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
  <TextField
    variant="outlined"
    fullWidth
    label=""
    name="photo"
    type="file"
    onChange={handleFileChange}
    InputProps={{
      style: { backgroundColor: 'rgb(16, 144, 230,0.2)' },
    }}
  />
</Grid>

            {userDetails.role === 'mentee' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Parents' Names"
                    name="parentsNames"
                    value={userDetails.parentsNames}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Parents' Occupation"
                    name="parentsOccupation"
                    value={userDetails.parentsOccupation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={userDetails.bloodGroup}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    value={userDetails.nationality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Religion"
                    name="religion"
                    value={userDetails.religion}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={4}
                    value={userDetails.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Class1"
                    name="class1"
                    value={userDetails.class1}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Admission Type"
                    name="admissionType"
                    value={userDetails.admissionType}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Classes Attended"
                    name="classesAttended"
                    value={userDetails.classesAttended}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Total Classes"
                    name="totalClasses"
                    value={userDetails.totalClasses}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem1 GPA"
                    name="sem1Gpa"
                    value={userDetails.sem1Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem2 GPA"
                    name="sem2Gpa"
                    value={userDetails.sem2Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem3 GPA"
                    name="sem3Gpa"
                    value={userDetails.sem3Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem4 GPA"
                    name="sem4Gpa"
                    value={userDetails.sem4Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem5 GPA"
                    name="sem5Gpa"
                    value={userDetails.sem5Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem6 GPA"
                    name="sem6Gpa"
                    value={userDetails.sem6Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem7 GPA"
                    name="sem7Gpa"
                    value={userDetails.sem7Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Sem8 GPA"
                    name="sem8Gpa"
                    value={userDetails.sem8Gpa}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Mentor Name"
                    name="mentorName"
                    value={userDetails.mentorName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Mentor Registration Number"
                    name="mentorRegistrationNumber"
                    value={userDetails.mentorRegistrationNumber}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
