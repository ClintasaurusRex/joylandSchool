import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import { setTestUserAsAdmin } from '../../utils/adminService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login successful');
      // Add a small delay to ensure Firebase auth state has updated
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 500);
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
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
          boxShadow: 24,
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
            boxShadow: 24,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {error && (
            <Alert severity='error' sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Button
            variant='text'
            color='secondary'
            onClick={async () => {
              try {
                // First set the test user as admin
                const adminResult = await setTestUserAsAdmin();
                console.log('Set test user as admin result:', adminResult);

                // Then log in with test credentials
                await signInWithEmailAndPassword(
                  auth,
                  'test.codemajic@gmail.com',
                  'password'
                );
                console.log('Test admin login successful');

                // Add a longer delay to ensure Firebase auth state has fully updated
                setTimeout(() => {
                  console.log('Navigating to dashboard after timeout');
                  navigate('/admin/dashboard', { replace: true });
                }, 2000); // Increase timeout to 2 seconds
              } catch (error) {
                console.error('Login error:', error);
                setError(error.message);
              }
            }}
            sx={{ mt: 1 }}
          >
            Login as Test Admin
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
