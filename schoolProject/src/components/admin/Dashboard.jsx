import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();

  console.log('Dashboard component rendering', {
    currentUser: currentUser?.email,
    isAdmin,
  });

  // Redirect if not logged in or not an admin
  if (!currentUser) {
    console.log('Dashboard redirecting: No current user');
    return <Navigate to='/admin/login' />;
  }

  if (!isAdmin) {
    console.log('Dashboard redirecting: Not an admin');
    return <Navigate to='/' />;
  }

  console.log('Dashboard rendering content');

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Admin Dashboard
        </Typography>

        <Typography variant='body1' paragraph>
          Welcome to the admin dashboard, {currentUser.email}!
        </Typography>

        <Typography variant='body1' paragraph>
          This is a placeholder for the admin dashboard content. You can add
          various management components here later.
        </Typography>

        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant='h6' gutterBottom>
            TODO: Implement these features
          </Typography>
          <ul>
            <li>News Management</li>
            <li>Academics Management</li>
            <li>Sports Management</li>
            <li>Form Submissions</li>
            <li>User Management</li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
