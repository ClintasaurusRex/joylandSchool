import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledHero = styled("div")({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
});

const HomePage = () => {
  return (
    <div>
      <StyledHero>
        <Container>
          <Typography variant="h2" gutterBottom>
            Welcome to Our School
          </Typography>
          <Typography variant="h5">Empowering minds, shaping futures</Typography>
        </Container>
      </StyledHero>

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Academic Excellence
                </Typography>
                <Typography>
                  Our commitment to high academic standards ensures students reach their full
                  potential.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Student Life
                </Typography>
                <Typography>
                  Explore our vibrant community and diverse extracurricular activities.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Discover
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Admissions
                </Typography>
                <Typography>
                  Join our community of learners. Applications now open for the next academic year.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Latest News
            </Typography>
            <Typography paragraph>
              Stay updated with the latest events, achievements, and announcements from our school
              community.
            </Typography>
            <Button variant="outlined" color="primary">
              View All News
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Upcoming Events
            </Typography>
            <Typography paragraph>
              Check out our calendar for upcoming school events, parent meetings, and activities.
            </Typography>
            <Button variant="outlined" color="primary">
              View Calendar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
