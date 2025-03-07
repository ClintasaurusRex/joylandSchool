import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main", // This will use the kenya-green from your variables
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Quick Links */}
            <Box>
              <Link href="/" color="inherit" sx={{ mx: 1 }}>
                Home
              </Link>
              <Link href="/academic" color="inherit" sx={{ mx: 1 }}>
                Courses
              </Link>
              <Link href="/admission" color="inherit" sx={{ mx: 1 }}>
                Admission
              </Link>
              <Link href="/contribute" color="inherit" sx={{ mx: 1 }}>
                Contribute
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
          <Link href="/login" color="inherit" sx={{ mx: 1 }}>
            Login
          </Link>
          <Link href="/contribute" color="inherit" sx={{ mx: 1 }}>
            Sign Up
          </Link>
        </Box>

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Joyland Prime Academy.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
