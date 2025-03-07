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
      <Container maxWidth="xl" sx={{ width: "100%" }}>
        {/* Left section */}
        <section className="links1">
          <Grid2 xs={12} sm={4} sx={{ textAlign: "center", flexDirection: "row" }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Link href="/" color="inherit" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/academic" color="inherit" sx={{ mb: 1 }}>
                Courses
              </Link>
              <Link href="/admission" color="inherit" sx={{ mb: 1 }}>
                Admission
              </Link>
              <Link href="/contribute" color="inherit" sx={{ mb: 1 }}>
                Contribute
              </Link>
            </Box>
            <Link href="/contact" color="inherit">
              Contact Us
            </Link>
          </Grid2>
        </section>

        {/* Right section */}

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Joyland Prime Academy.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
