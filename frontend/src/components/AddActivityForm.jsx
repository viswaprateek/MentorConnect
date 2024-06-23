import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addActivity, getAllActivities } from '../api';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem
} from '@mui/material';
import './AddActivityForm.css'; // Import the custom CSS file

const AddActivityForm = ({ onActivityAdded }) => {
  const { id: menteeId } = useParams(); // Use useParams to get the menteeId from the URL
  const [activityData, setActivityData] = useState({ menteeId, name: '', type: '', description: '' });
  const [activities, setActivities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const fetchedActivities = await getAllActivities(menteeId);
        setActivities(fetchedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (menteeId) {
      fetchActivities();
    }
  }, [menteeId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!activityData.name) newErrors.name = 'Activity name is required';
    if (!activityData.type) newErrors.type = 'Activity type is required';
    if (!activityData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!menteeId) {
      console.error('Mentee ID is not defined');
      return;
    }
    if (!validate()) return;
    try {
      const newActivity = {
        menteeId,
        name: activityData.name,
        type: activityData.type,
        description: activityData.description,
      };
      const savedActivity = await addActivity(newActivity);
      setActivities([...activities, savedActivity]);
      onActivityAdded(savedActivity);
      setActivityData({ menteeId, name: '', type: '', description: '' });
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add Activity
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Activity Name"
              name="name"
              value={activityData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />
            {/* Commented out dropdown for future use
            <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.type}>
              <InputLabel>Activity Type</InputLabel>
              <Select
                label="Activity Type"
                name="type"
                value={activityData.type}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Literature">Literature</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                {/* Add more options as needed */}
            {/*  </Select>
              {errors.type && <Typography color="error">{errors.type}</Typography>}
            </FormControl>
            */}
            <TextField
              fullWidth
              label="Activity Type"
              name="type"
              value={activityData.type}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.type}
              helperText={errors.type}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={activityData.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Activity
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 5 }}>
        Activity List
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={<strong>{activity.name}</strong>}
              secondary={
                <>
                  <strong>Type:</strong> {activity.type} <br />
                  <strong>Description:</strong> {activity.description}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AddActivityForm;
