import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';


const useHideOnScroll = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return show;
};

const MiniLayout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();
  const show = useHideOnScroll();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      <Slide appear={false} direction="down" in={show}>
        <AppBar position="fixed" sx={{ backgroundColor: '#212529', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography
              component="div"
              sx={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '1.8rem', 
                flex: 1, 
                textAlign: 'center', 
                color: 'white',
                cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              MentorConnect
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '1.2rem', 
                  color: 'white', 
                  textAlign: 'right' 
                }}
              >
                Welcome, {name}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ marginLeft: 1, fontSize: '0.8rem', color: 'white' }}
                >
                  ({userRole})
                </Typography>
              </Typography>
              <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                <ExitToApp />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
          mt: 8, // Adds top margin to account for AppBar
          width: '100%',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#212529',
          py: 2,
          color: 'white',
          mt: 'auto',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ color: 'white' }}
        >
          &copy; {new Date().getFullYear()} MentorConnect. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniLayout;
