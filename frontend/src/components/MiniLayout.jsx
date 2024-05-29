import React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ExitToApp,
} from '@mui/icons-material';

const MiniLayout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logic to clear user authentication (e.g., remove cookies or clear state)
    logout();
    // Redirect to the registration page after logout
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#212529', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography  component="div" sx={{ fontFamily: 'Poppins, sans-serif',fontSize:'1.8rem', flex: 1, textAlign: 'center', color: 'white' }}>
            MentorConnect
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: 'white' }}>
              Welcome! {name}
              <Typography variant="body2" component="span" sx={{ marginLeft: 1, fontSize: '0.8rem', color: 'white' }}>
                ({userRole})
              </Typography>
            </Typography>
            <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto', // Enable scrolling
          height: 'calc(100vh - 64px)', // Adjust the height as needed
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Footer */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ backgroundColor: '#212529', py: 2, color: 'white', mt: 'auto', position: 'fixed', bottom: 0, width: '100%' }}
      >
        &copy; MentorConnect.
      </Typography>
    </Box>
  );
};

export default MiniLayout;
