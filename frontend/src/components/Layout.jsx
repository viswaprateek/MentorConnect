import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMentee } from '../MenteeContext'; // Import useMentee hook

// Import MenteeDashboard component
import {
  ExitToApp,
  Dashboard as DashboardIcon,
  School as SchoolIcon, // For Academics
  SportsEsports as SportsEsportsIcon, // For Non-Academics
  Event as EventIcon, // For Meeting Schedules
  Assignment as AssignmentIcon, // For Approvals
  Feedback as FeedbackIcon, // For Mentor Remarks
  Lock as LockIcon, // For Change Password
  AssignmentTurnedIn as AssignmentTurnedInIcon, // For Attendance
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();
  const { menteeId } = useMentee(); // Access menteeId from the context

  const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu anchor element

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976D2', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Poppins, sans-serif', flex: 1, textAlign: 'center', color: 'white' }}>
            MentorConnect.vnrvjiet
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="h1" component="div" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: 'white' }}>
              👋🏻{name}
              <Typography variant="h6" component="span" sx={{ marginLeft: 1, fontSize: '0.8rem', color: 'white' }}>
                ({userRole})
              </Typography>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: '220px',
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          '& .MuiDrawer-paper': {
            width: '220px',
            backgroundColor: '#1976D2',
          },
        }}
      >
        <Toolbar />
        <List>
          <>
<ListItem button component={Link} to={`/menteedashboard/${menteeId}`} sx={{ mb: 2, color: 'white' }}>
              <DashboardIcon />
              <ListItemText primary="Basic Info" />
            </ListItem>
            <ListItem button onClick={handleMenuClick} sx={{ mb: 2, color: 'white' }}>
              <AssignmentIcon />
              <ListItemText primary="Performance" />
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#1976D2',
                  color: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose} sx={{ justifyContent: 'flex-start' }}>
                <Button
                  variant="text"
                  fullWidth
                  component={Link}
                  to="/academics"
                  sx={{
                    textAlign: 'left',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#115293',
                    },
                  }}
                >
                  <SchoolIcon sx={{ mr: 1 }} />
                  Academics
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ justifyContent: 'flex-start' }}>
                <Button
                  variant="text"
                  fullWidth
                  component={Link}
                  to="/nonacademics"
                  sx={{
                    textAlign: 'left',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#115293',
                    },
                  }}
                >
                  <SportsEsportsIcon sx={{ mr: 1 }} />
                  Non-Academics
                </Button>
              </MenuItem>
            </Menu>
            <ListItem button component={Link} to="/attendance" sx={{ mb: 2, color: 'white' }}>
              <AssignmentTurnedInIcon />
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button component={Link} to="/approvals" sx={{ mb: 2, color: 'white' }}>
              <AssignmentIcon />
              <ListItemText primary="Approvals" />
            </ListItem>
            <ListItem button component={Link} to="/meetingschedules" sx={{ mb: 2, color: 'white' }}>
              <EventIcon />
              <ListItemText primary="Meeting Schedules" />
            </ListItem>
            <ListItem button component={Link} to= {`/changepassword/`} sx={{ mb: 2, color: 'white' }}>

              <LockIcon />
              <ListItemText primary="Change Password" />
            </ListItem>
            <Button sx={{ color: 'white', marginTop: 'auto' }} onClick={handleLogout}>
              <ExitToApp />
              Logout
            </Button>
          </>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
          height: 'calc(100vh - 64px)',
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
        sx={{ backgroundColor: '#1976D2', py: 2, color: 'white', mt: 'auto', position: 'fixed', bottom: 0, width: '100%' }}
      >
        @MentorConnect.vnrvjiet.
      </Typography>
    </Box>
  );
};

export default Layout;
