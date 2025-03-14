import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.scss";
import { fetchNews } from "../utils/adminService";

const StyledHero = styled("div")({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
});

const FeatureSection = styled("div")(({ bgImage, bgColor }) => ({
  background: bgImage
    ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`
    : bgColor || "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  padding: "3rem 0",
  marginBottom: "1.5rem",
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
}));

const HomePage = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch news data from Firebase
  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();

        const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsItems(sortedNews.slice(0, 6)); // Get only the 6 most recent news items
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  const handleReadMore = (news) => {
    setSelectedNews(news);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <StyledHero>
        <Container>
          <Typography variant="h2" gutterBottom className="hero-header">
            joyland prime academy
          </Typography>
          <Typography variant="h5" className="hero-header">
            education is treasure
          </Typography>
        </Container>
      </StyledHero>

      <Container>
        <Typography variant="h3" gutterBottom>
          Discover Joyland School
        </Typography>
        <Box>
          <Typography variant="h6" gutterBottom>
            Where learning becomes an exciting journey
          </Typography>
        </Box>

        {/* Academic Excellence Hero Section */}
        <FeatureSection bgImage="/blackboard1.jpeg" maxWidth="xl">
          <Container maxWidth="xl">
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h3" gutterBottom>
                Academic Excellence
              </Typography>
              <Typography variant="h6" paragraph>
                Our commitment to high academic standards ensures students reach their full
                potential.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                onClick={() => navigate("/academic")}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </FeatureSection>

        {/* Help Us Out Hero Section */}
        <FeatureSection
          bgImage="classroom.jpeg"
          bgColor="linear-gradient(45deg, #FF5722 30%, #FFC107 90%)"
        >
          <Container>
            <Box sx={{ maxWidth: 600, ml: "auto" }}>
              <Typography variant="h3" gutterBottom>
                Help Us Out
              </Typography>
              <Typography variant="h6" paragraph>
                Learn how you can contribute through donations, volunteering, or joining in our
                community events.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "white",
                  color: "#FF5722",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                onClick={() => navigate("/contribute")}
              >
                Contribute
              </Button>
            </Box>
          </Container>
        </FeatureSection>

        {/* Admissions Hero Section */}
        <FeatureSection
          bgImage="/culture1.jpeg"
          bgColor="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)"
        >
          <Container>
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h3" gutterBottom>
                Admissions
              </Typography>
              <Typography variant="h6" paragraph>
                Join our community of learners. Applications now open for the next academic year.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "white",
                  color: "#4CAF50",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                onClick={() => navigate("/admission")}
              >
                Apply Now
              </Button>
            </Box>
          </Container>
        </FeatureSection>

        <Grid
          container
          spacing={4}
          sx={{
            mt: 6,
            flexGrow: 1,
            minHeight: "calc(100vh - 600px)",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Latest News
            </Typography>
            <Typography paragraph className="news-start">
              Stay updated with the latest events, achievements, and announcements from our school
              community.
            </Typography>
            <Button
              size="small"
              sx={{ textDecoration: "underline" }}
              color="primary"
              onClick={() => navigate("/news")}
            >
              Read all news
            </Button>
          </Grid>

          {/* News Items */}
          {loading ? (
            <Grid item xs={12} sx={{ textAlign: "center", py: 4 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Loading news...
              </Typography>
            </Grid>
          ) : newsItems.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1">No news items available at this time.</Typography>
            </Grid>
          ) : (
            newsItems.map((news) => (
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
                      {news.content.length > 120
                        ? `${news.content.substring(0, 120)}...`
                        : news.content}
                    </Typography>
                    <Box sx={{ textAlign: "right" }}>
                      <Button size="small" color="primary" onClick={() => handleReadMore(news)}>
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* News Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xl" fullWidth>
        {selectedNews && (
          <>
            <DialogTitle>
              {selectedNews.title}
              <Typography variant="caption" color="text.secondary" display="block">
                {selectedNews.date}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {selectedNews.content}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};
export default HomePage;
