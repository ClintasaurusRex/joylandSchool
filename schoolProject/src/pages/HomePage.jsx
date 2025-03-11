import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.scss';
import { fetchNews } from '../utils/adminService';

const StyledHero = styled('div')({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  padding: '4rem 0',
  marginBottom: '2rem',
});

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
        // Sort news by date (newest first)
        const sortedNews = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNewsItems(sortedNews.slice(0, 3)); // Get only the 3 most recent news items
      } catch (error) {
        console.error('Error fetching news:', error);
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
        {/* <img src="/joylandschool.png" alt="joyland picture" className="logo-home" /> */}

        <Container>
          <Typography variant='h2' gutterBottom className='hero-header'>
            joyland prime academy
          </Typography>
          <Typography variant='h5' className='hero-header'>
            education is treasure
          </Typography>
        </Container>
      </StyledHero>

      <div className='animated-gradient'>
        <Container>
          <Typography variant='h3' gutterBottom>
            Discover Joyland School
          </Typography>
          <Typography variant='h6'>
            Where learning becomes an exciting journey
          </Typography>
        </Container>

        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className='content-cart'>
                  <Typography variant='h5' gutterBottom>
                    Academic Excellence
                  </Typography>
                  <Typography>
                    Our commitment to high academic standards ensures students
                    reach their full potential.
                  </Typography>
                  <Button
                    className='content-card-btn'
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/academic')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className='content-cart'>
                  <Typography variant='h5' gutterBottom>
                    Help Us Out
                  </Typography>
                  <Typography>
                    Learn how you can contribute through donations,
                    volunteering, or joining in our community events.
                  </Typography>
                  <Button
                    className='content-card-btn'
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/contribute')}
                  >
                    Contribute
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent className='content-cart'>
                  <Typography variant='h5' gutterBottom>
                    Admissions
                  </Typography>
                  <Typography>
                    Join our community of learners. Applications now open for
                    the next academic year.
                  </Typography>
                  <Button
                    className='content-card-btn'
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/admission')}
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
              minHeight: 'calc(100vh - 400px)',
            }}
          >
            <Grid item xs={12}>
              <Typography variant='h4' gutterBottom>
                Latest News
              </Typography>
              <Typography paragraph className='news-start'>
                Stay updated with the latest events, achievements, and
                announcements from our school community.
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ mb: 4 }}
                  onClick={() => navigate('/news')}
                >
                  View All News
                </Button>
              </Typography>
            </Grid>

            {/* News Items */}
            {loading ? (
              <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
                <Typography variant='body1' sx={{ mt: 2 }}>
                  Loading news...
                </Typography>
              </Grid>
            ) : newsItems.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant='body1'>
                  No news items available at this time.
                </Typography>
              </Grid>
            ) : (
              newsItems.map((news) => (
                <Grid item xs={12} md={4} key={news.id}>
                  <Card elevation={2}>
                    <CardContent>
                      <Typography variant='h6' gutterBottom>
                        {news.title}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                        gutterBottom
                      >
                        {news.date}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant='body2' paragraph>
                        {news.content.length > 150
                          ? `${news.content.substring(0, 150)}...`
                          : news.content}
                      </Typography>
                      <Box sx={{ textAlign: 'right' }}>
                        <Button
                          size='small'
                          color='primary'
                          onClick={() => handleReadMore(news)}
                        >
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
      </div>

      {/* News Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth='md'
        fullWidth
      >
        {selectedNews && (
          <>
            <DialogTitle>
              {selectedNews.title}
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
              >
                {selectedNews.date}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
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
