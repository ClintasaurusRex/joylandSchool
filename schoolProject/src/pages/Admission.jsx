import React, { useState } from "react";
import "../styles/admission.css";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const Admission = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    previousSchool: "",
    gradeApplying: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(setFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper className="admission-main" elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Student Admission Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Previous School"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Grade Applying For"
                name="gradeApplying"
                value={formData.gradeApplying}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Parent Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Parent Phone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Parent Email"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Admission;
