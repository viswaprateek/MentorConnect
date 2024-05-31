import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import { updatePermissionStatus } from '../api';

const PermissionsList = ({ permissions, onStatusChange }) => {
  const { userRole } = useAuth(); // Get user role from AuthContext

  const handleStatusChange = async (id, status) => {
    try {
      const updatedPermission = await updatePermissionStatus(id, status);
      onStatusChange(updatedPermission);
    } catch (error) {
      console.error('Error updating permission status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'black';
    }
  };

  return (
    <Grid container spacing={2}>
      {permissions.map((permission) => (
        <Grid item xs={12} sm={6} md={4} key={permission._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{permission.title}</Typography>
              <Typography variant="body1">{permission.description}</Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(permission.date).toLocaleString()}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: 'bold', color: getStatusColor(permission.status) }}>
                Status: {permission.status.charAt(0).toUpperCase() + permission.status.slice(1)}
              </Typography>
              {userRole === 'mentor' && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange(permission._id, 'accepted')}
                    disabled={permission.status !== 'pending'}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleStatusChange(permission._id, 'rejected')}
                    disabled={permission.status !== 'pending'}
                    sx={{ mt: 1 }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PermissionsList;
