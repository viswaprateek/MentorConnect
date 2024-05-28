import React, { useState } from 'react';
import { useAuth } from "../AuthContext";
import { changePassword } from "../api"; // Import the changePassword function
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Layout from './Layout';
import Alert from '@mui/material/Alert'; // Import the Alert component

function ChangePassword() {
  const {  userId, userRole } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  console.log(userId,userRole)
  const handleChangePassword = async () => {
    try {
      await changePassword(userId, currentPassword, newPassword, userRole);
      setSuccess("✅Password changed successfully");
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
        <div>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
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
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography sx={{ textAlign:'center', backgroundColor: 'green', color: 'white' }}>{success}</Typography>}

      
      
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export default ChangePassword;
