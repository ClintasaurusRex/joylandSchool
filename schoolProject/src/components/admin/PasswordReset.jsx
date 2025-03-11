import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Please enter your email address');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
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
          <Typography component='h1' variant='h5' gutterBottom>
            Reset Password
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          {error && (
            <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
              Password reset email sent! Check your inbox.
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
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

            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
            </Button>

            <Button
              fullWidth
              variant='text'
              onClick={() => navigate('/admin/login')}
              sx={{ mt: 1 }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PasswordReset;
