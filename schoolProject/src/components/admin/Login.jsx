import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { setJoylandSchoolsAsAdmin } from "../../utils/adminService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Login successful");

      resetForm();

      // Add a delay to ensure Firebase auth state has updated*****
      setTimeout(() => {
        setLoginSuccess(true);
        setLoading(false);
      }, 3200);

      if (formData.email === import.meta.env.VITE_TEST_ADMIN_EMAIL) {
        try {
          await setJoylandSchoolsAsAdmin();
        } catch (error) {
          console.error("Error setting Joyland Schools as admin:", error);
        }
      }
    } catch (error) {
      setError("Password is incorrect");
      console.error("Login error:", error);
      setLoading(false);

      resetForm();
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ minHeight: "calc(100vh - 200px)" }}>
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 24,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxShadow: 24,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 1,
              }}
            >
              <Button variant="text" size="small" onClick={() => navigate("/admin/reset-password")}>
                Forgot password?
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>

          {loginSuccess && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body1" color="success.main" gutterBottom>
                Login successful! You can now go to the admin dashboard.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin/dashboard", { replace: true })}
                sx={{ mt: 1 }}
              >
                Go to Admin Dashboard
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
