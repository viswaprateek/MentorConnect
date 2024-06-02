import React, { useState } from 'react';
import { useAuth } from "../AuthContext";
import { changePassword } from "../api";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Layout from './Layout';
import { keyframes } from '@emotion/react';

// Define a subtle floating animation using keyframes
const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

function ChangePassword() {
  const { userId, userRole } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    try {
      await changePassword(userId, currentPassword, newPassword, userRole);
      setSuccess("Password changed successfully!");
      setError("");
    } catch (error) {
      setError("Failed to change password. Please check your current password.");
      setSuccess("");
    }
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            animation: `${floating} 6s ease-in-out infinite`,
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              mb: 2, 
              fontFamily: 'Roboto, sans-serif', 
              color: '#333',
              textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            Change Password
          </Typography>
          <Box component="form" sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              sx={{ backgroundColor: '#f5f5f5', borderRadius: 1, input: { color: '#333' }, label: { color: '#333' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              sx={{ backgroundColor: '#f5f5f5', borderRadius: 1, input: { color: '#333' }, label: { color: '#333' } }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif', backgroundColor: '#ffebee', color: '#d32f2f' }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif', backgroundColor: '#e8f5e9', color: '#388e3c' }}>
                {success}
              </Alert>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                fontFamily: 'Roboto, sans-serif', 
                backgroundColor: '#1976d2', 
                color: '#ffffff', 
                '&:hover': {
                  backgroundColor: '#1565c0',
                } 
              }}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default ChangePassword;
