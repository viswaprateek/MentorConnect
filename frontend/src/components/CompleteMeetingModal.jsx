import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

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

const CompleteMeetingModal = ({ open, onClose, onComplete }) => {
  const [mom, setMom] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleComplete = () => {
    onComplete(mom, remarks);
    setMom('');
    setRemarks('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Complete Meeting</h2>
        <TextField
          label="MoM"
          value={mom}
          onChange={(e) => setMom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleComplete} sx={{ mt: 2 }}>
          Complete
        </Button>
      </Box>
    </Modal>
  );
};

export default CompleteMeetingModal;
