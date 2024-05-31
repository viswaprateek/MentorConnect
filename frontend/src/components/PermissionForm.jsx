import React, { useState } from 'react';
import { Box, Button, TextField, Modal } from '@mui/material';
import { requestPermission } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const PermissionForm = ({ open, onClose, onPermissionAdded }) => {
  const { userId: mentorId } = useAuth();
  const { menteeId } = useMentee();
  const [permissionData, setPermissionData] = useState({ title: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPermissionData({ ...permissionData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPermission = {
        mentorId,
        menteeId,
        title: permissionData.title,
        description: permissionData.description,
      };
      const savedPermission = await requestPermission(newPermission);
      onPermissionAdded(savedPermission);
      setPermissionData({ title: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Request Permission</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={permissionData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={permissionData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Request
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PermissionForm;
