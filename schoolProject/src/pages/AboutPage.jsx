import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  backgroundColor: "#f5f5f5",
}));

const AboutPage = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          About Our School
        </Typography>

        <Typography variant="h5" color="textSecondary" align="center" paragraph sx={{ mb: 6 }}>
          Providing Quality Education Since 1990
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography paragraph>
                We are committed to providing an exceptional learning environment where students can
                develop their intellectual, social, and creative abilities to their fullest
                potential.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography paragraph>
                To be a leading educational institution that inspires and empowers students to
                become innovative thinkers, responsible citizens, and future leaders.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Core Values
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Excellence</Typography>
                  <Typography>Striving for the highest standards in education</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Integrity</Typography>
                  <Typography>Maintaining strong ethical principles</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Innovation</Typography>
                  <Typography>Embracing new ideas and methods</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Community</Typography>
                  <Typography>Building strong relationships</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Our History
              </Typography>
              <Typography paragraph>
                Founded in 1990, our school has grown from a small local institution to a renowned
                center of learning. Over the years, we have consistently evolved our teaching
                methods and facilities while maintaining our commitment to academic excellence and
                personal development.
              </Typography>
              <Typography paragraph>
                Today, we proudly serve over 1,000 students and employ more than 100 dedicated
                faculty members who are experts in their respective fields.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
