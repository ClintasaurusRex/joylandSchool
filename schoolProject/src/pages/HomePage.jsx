import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.scss";

const StyledHero = styled("div")({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
});

const HomePage = () => {
  const navigate = useNavigate();

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Annual Science Fair Winners Announced",
      date: "June 15, 2023",
      content:
        "Congratulations to all participants in this year's Science Fair. Special recognition goes to Emily Chen for her innovative renewable energy project.",
    },
    {
      id: 2,
      title: "New Sports Facility Opening Next Month",
      date: "June 10, 2023",
      content:
        "We're excited to announce the grand opening of our state-of-the-art sports complex, featuring an Olympic-sized swimming pool and modern gymnasium.",
    },
    {
      id: 3,
      title: "Summer Reading Program Kicks Off",
      date: "June 5, 2023",
      content:
        "Join us for our annual summer reading challenge! Students who complete the program will be eligible for exciting prizes and recognition at our fall assembly.",
    },
  ];

  // sx={{ background: "black" }}
  return (
    <div>
      <StyledHero>
        {/* <img src="/joylandschool.png" alt="joyland picture" className="logo-home" /> */}

        <Container>
          <Typography variant="h2" gutterBottom className="hero-header">
            joyland prime academy
          </Typography>
          <Typography variant="h5" className="hero-header">
            {" "}
            education is treasure
          </Typography>
        </Container>
      </StyledHero>

      <div className="animated-gradient">
        <Container>
          <Typography variant="h3" gutterBottom>
            Discover Joyland School
          </Typography>
          <Typography variant="h6">Where learning becomes an exciting journey</Typography>
        </Container>

        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className="content-cart">
                  <Typography variant="h5" gutterBottom>
                    Academic Excellence
                  </Typography>
                  <Typography>
                    Our commitment to high academic standards ensures students reach their full
                    potential.
                  </Typography>
                  <Button
                    className="content-card-btn"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/academic")}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className="content-cart">
                  <Typography variant="h5" gutterBottom>
                    Help Us Out
                  </Typography>
                  <Typography>
                    Learn how you can contribute through donations, volunteering, or joining in our
                    community events.
                  </Typography>
                  <Button
                    className="content-card-btn"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/contribute")}
                  >
                    Contribute
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className="content-cart">
                  <Typography variant="h5" gutterBottom>
                    Admissions
                  </Typography>
                  <Typography>
                    Join our community of learners. Applications now open for the next academic
                    year.
                  </Typography>
                  <Button
                    className="content-card-btn"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/admission")}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
            sx={{
              mt: 4,
              flexGrow: 1,
              minHeight: "calc(100vh - 400px)",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Latest News
              </Typography>
              <Typography paragraph className="news-start">
                Stay updated with the latest events, achievements, and announcements from our school
                community.
                <Button variant="outlined" color="primary" sx={{ mb: 4 }}>
                  View All News
                </Button>
              </Typography>
            </Grid>

            {/* News Items */}
            {newsItems.map((news) => (
              <Grid item xs={12} md={4} key={news.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {news.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      {news.date}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" paragraph>
                      {news.content}
                    </Typography>
                    <Box sx={{ textAlign: "right" }}>
                      <Button size="small" color="primary">
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};
export default HomePage;
