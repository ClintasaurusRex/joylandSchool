import { Box, Container, Typography, Link, Grid2 } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 item size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body5">
              We are dedicated to providing quality education and resources for students.
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">
              Home
            </Link>
            <Link href="/academic" color="inherit" display="block">
              Courses
            </Link>
            <Link href="/admission" color="inherit" display="block">
              Admission
            </Link>
            <Link href="/contribute" color="inherit" display="block">
              Contribute
            </Link>
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom>
              <Link href="/contact" color="inherit" display="block">
                Contact Us
              </Link>
            </Typography>
            <Typography variant="body2">
              Email: info@school.com
              <br />
              Phone: (123) 456-7890
              <br />
              Address: 123 Education St.
            </Typography>
          </Grid2>
        </Grid2>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} School Project. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
