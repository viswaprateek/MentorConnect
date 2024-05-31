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

// Define a simple 3D animation using keyframes
const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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
            backgroundColor: '#2c2c2c',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
            animation: `${floating} 4s ease-in-out infinite`,
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 2, 
              fontFamily: 'Lucida Console, Monaco, monospace', 
              color: '#e0e0e0',
              textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Change Password:
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
              sx={{ backgroundColor: '#404040', borderRadius: 1, input: { color: '#e0e0e0' }, label: { color: '#e0e0e0' } }}
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
              sx={{ backgroundColor: '#404040', borderRadius: 1, input: { color: '#e0e0e0' }, label: { color: '#e0e0e0' } }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2, fontFamily: 'Lucida Console, Monaco, monospace', backgroundColor: '#ffcccb', color: '#b71c1c' }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2, fontFamily: 'Lucida Console, Monaco, monospace', backgroundColor: '#c8e6c9', color: '#2e7d32' }}>
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
                fontFamily: 'Lucida Console, Monaco, monospace', 
                backgroundColor: '#37474f', 
                color: '#ffffff', 
                '&:hover': {
                  backgroundColor: '#263238',
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
