import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
  Button,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMentee } from '../MenteeContext'; // Import useMentee hook
import {
  ExitToApp,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  SportsEsports as SportsEsportsIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Lock as LockIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Person as PersonIcon, // User icon
  Menu as MenuIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();
  const { menteeId } = useMentee(); // Access menteeId from the context

  const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu anchor element
  const [mobileOpen, setMobileOpen] = useState(false); // State to manage the mobile drawer

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: '250px', backgroundColor: '#212529', color: 'white', height: '100%' }}>
      <Box sx={{ padding: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <SchoolIcon sx={{ color: 'white', fontSize: '2rem' }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>MentorConnect</Typography>
      </Box>
      <List>
        {userRole === 'mentor' ? (
          <>
            <ListItem
              button
              component={Link}
              to={`/menteedashboard/${menteeId}`}
              sx={{
                color: 'white',
                mb: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(0.9)',
                },
              }}
            >
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Basic Info" sx={{ fontSize: '16px' }} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              component={Link}
              to={`/menteedashboard/${menteeId}`}
              sx={{
                color: 'white',
                mb: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(0.9)',
                },
              }}
            >
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard" sx={{ fontSize: '16px' }} />
            </ListItem>
          </>
        )}
        <ListItem
          button
          onClick={handleMenuClick}
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <AssignmentIcon sx={{ mr: 2 }} />
          <ListItemText primary="Performance" sx={{ fontSize: '16px' }} />
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
              backgroundColor: '#212529',
              color: '#212529',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Button
              variant="text"
              fullWidth
              component={Link}
              to="/academics"
              sx={{
                textAlign: 'left',
                color: 'white',
                backgroundColor: '#212529',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#7745e0',
                },
              }}
            >
              <SchoolIcon sx={{ mr: 1 }} />
              Academics
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Button
              variant="text"
              fullWidth
              component={Link}
              to="/nonacademics"
              sx={{
                textAlign: 'left',
                backgroundColor: '#212529',
                color: 'white',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#7745e0',
                },
              }}
            >
              <SportsEsportsIcon sx={{ mr: 1 }} />
              Non-Academics
            </Button>
          </MenuItem>
        </Menu>
        <ListItem
          button
          component={Link}
          to={`/attendance/${menteeId}`}
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <AssignmentTurnedInIcon sx={{ mr: 2 }} />
          <ListItemText primary="Attendance" sx={{ fontSize: '16px' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`/permissions/${menteeId}`}
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <AssignmentIcon sx={{ mr: 2 }} />
          <ListItemText primary="Permissions" sx={{ fontSize: '16px' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/meetingschedules"
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <EventIcon sx={{ mr: 2 }} />
          <ListItemText primary="Meeting Schedules" sx={{ fontSize: '16px' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/changepassword"
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <LockIcon sx={{ mr: 2 }} />
          <ListItemText primary="Change Password" sx={{ fontSize: '16px' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/mentordashboard"
          sx={{
            color: 'white',
            mb: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(0.9)',
            },
          }}
        >
          <PersonIcon sx={{ mr: 2 }} />
          <ListItemText primary="My Profile" sx={{ fontSize: '16px' }} />
        </ListItem>
      </List>

      <Box sx={{ mt: 'auto', mb: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <PersonIcon sx={{ color: 'white', fontSize: '2.6rem', marginRight: '5px', marginTop: '2.5px' }} /> {/* User icon */}
          <Box>
            <Typography variant="body1" sx={{ color: 'white', fontSize: '1.2rem' }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.7rem' }}>
              {userRole}
            </Typography>
          </Box>
        </Box>
        {/* <Button
          onClick={handleLogout}
          sx={{
            color: 'white',
            borderColor: 'white',
            transition: 'background-color 0.3s, color 0.3s', // Smooth hover effect
            '&:hover': {
              borderColor: 'white',
              backgroundColor: '#DC143C',
            },
          }}
        >
          <ExitToApp sx={{ mr: 1 }} />
          Logout
        </Button> */}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ backgroundColor: '#212529', display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MentorConnect
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem', marginRight: '20px' }}>
              {name} ({userRole})
            </Typography>
            <Button
              onClick={handleLogout}
              sx={{
                color: 'white',
                borderColor: 'white',
                transition: 'background-color 0.3s, color 0.3s', // Smooth hover effect
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: '#DC143C',
                },
              }}
            >
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Toggle Button for Mobile View */}
      <IconButton
        color="black"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' }, position: 'fixed', top: 16, left: 10, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: '250px',
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          '& .MuiDrawer-paper': {
            width: '250px',
            backgroundColor: '#212529',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRight: 'none',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '250px',
            backgroundColor: '#212529',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRight: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
          marginTop: '64px', // Add margin to account for the AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
