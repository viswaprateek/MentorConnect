import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addActivity } from '../api';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const AddActivityForm = ({ onActivityAdded }) => {
  const menteeId = useParams().id; // Use useParams to get the menteeId from the URL
  const [activityData, setActivityData] = useState({ name: '', type: '', description: '' });
  const [activities, setActivities] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!menteeId) {
      console.error('User ID is not defined');
      return;
    }
    try {
      const newActivity = {
        name: activityData.name,
        type: activityData.type,
        description: activityData.description,
      };
      const savedActivity = await addActivity(newActivity);
      setActivities([...activities, savedActivity]);
      onActivityAdded(savedActivity);
      setActivityData({ name: '', type: '', description: '' });
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <Container maxWidth="sm">
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
        />
        <TextField
          fullWidth
          label="Activity Type"
          name="type"
          value={activityData.type}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
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
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Activity
        </Button>
      </Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
        Activity List
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={<strong>{activity.name}</strong>}
              secondary={
                <>
                  {activity.type} <br />
                  {activity.description}
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
