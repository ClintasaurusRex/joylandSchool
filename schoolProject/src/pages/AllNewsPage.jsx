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
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { fetchNews } from "../utils/adminService";

const StyledHeader = styled("div")({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: "2rem 0",
  marginBottom: "2rem",
});

const AllNewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsItems(sortedNews.slice(0, 10)); // Get up to 10 news items
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
      <StyledHeader>
        <Container>
          <Typography variant="h3" gutterBottom className="hero-header">
            School News & Updates
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link component={RouterLink} to="/" sx={{ color: "white" }}>
              Home
            </Link>
            <Typography color="white">News</Typography>
          </Breadcrumbs>
        </Container>
      </StyledHeader>

      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          All News
        </Typography>
        <Typography paragraph>
          Stay informed with all the latest events, achievements, and announcements from Joyland
          Prime Academy.
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading news...
            </Typography>
          </Box>
        ) : newsItems.length === 0 ? (
          <Typography variant="body1">No news items available at this time.</Typography>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {newsItems.map((news) => (
              <Grid item xs={12} md={6} lg={4} key={news.id}>
                <Card
                  elevation={2}
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
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
                      {news.content.length > 150
                        ? `${news.content.substring(0, 150)}...`
                        : news.content}
                    </Typography>
                  </CardContent>
                  <Box sx={{ textAlign: "right", p: 2 }}>
                    <Button variant="outlined" color="primary" onClick={() => handleReadMore(news)}>
                      Read More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* News Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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

export default AllNewsPage;
