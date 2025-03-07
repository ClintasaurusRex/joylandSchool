import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2f27ce", // This will use the kenya-green from your variables
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {/* Quick Links */}

          <Link href="/" color="inherit" sx={{ mx: 5 }}>
            Home
          </Link>
          <Link href="/academic" color="inherit" sx={{ mx: 5 }}>
            Courses
          </Link>
          <Link href="/admission" color="inherit" sx={{ mx: 5 }}>
            Admission
          </Link>
          <Link href="/contribute" color="inherit" sx={{ mx: 5 }}>
            Contribute
          </Link>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link href="/contact" color="inherit" sx={{ mx: 5 }}>
            Contact Us
          </Link>
          <Link href="/" color="inherit" sx={{ mx: 5 }}>
            Login
          </Link>
          <Link href="/" color="inherit" sx={{ mx: 5 }}>
            Sign Up
          </Link>
        </Box>

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Joyland Prime Academy.
          <img
            src="/joylandschool.png"
            alt="joyland picture"
            height="25px"
            width="25px"
            style={{ marginLeft: "10px" }}
          />
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
