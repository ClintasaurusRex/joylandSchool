import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/config';
import { addData } from '../../utils/firestore';

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';

function AdminSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError('');

      if (!email || !password) {
        setError('Please fill out all of the fields');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user to Firestore with admin role
      await addData('users', {
        uid: user.uid,
        email: user.email,
        role: 'admin',
        createdAt: new Date(),
      });

      console.log('Admin user signed up:', user);
      setSuccess('Admin account created successfully!');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <Container
      component='main'
      maxWidth='sm'
      sx={{ minHeight: 'calc(100vh - 200px)' }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component='h1' variant='h5'>
            Admin Sign Up
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity='success' sx={{ mt: 2, width: '100%' }}>
              {success}
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSignUp}
            sx={{ mt: 1, width: '100%' }}
            noValidate
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignUp}
            >
              Create Admin Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default AdminSignUp;
