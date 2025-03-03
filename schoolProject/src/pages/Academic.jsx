import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const Academic = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Academic Programs
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Undergraduate Programs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our undergraduate programs offer comprehensive education in various fields
                including:
              </Typography>
              <ul>
                <li>Computer Science</li>
                <li>Business Administration</li>
                <li>Engineering</li>
                <li>Liberal Arts</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Graduate Programs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Advanced studies and research opportunities in:
              </Typography>
              <ul>
                <li>Master's Programs</li>
                <li>Doctoral Studies</li>
                <li>Professional Certificates</li>
                <li>Research Fellowships</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Academic Resources
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We provide comprehensive support for your academic journey:
              </Typography>
              <ul>
                <li>Library Services</li>
                <li>Research Centers</li>
                <li>Academic Advising</li>
                <li>Tutoring Services</li>
                <li>Writing Center</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Academic;
