import { Box, Container, Typography, Link } from "@mui/material";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2f27ce",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Typography varient="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          Quick Links
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Link
            className="footer-link"
            href="/"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            className="footer-link"
            href="/academic"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Courses
          </Link>
          <Link
            className="footer-link"
            href="/admission"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Admission
          </Link>
          <Link
            className="footer-link"
            href="/contribute"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Contribute
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link
            className="footer-link"
            href="/contact"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Contact Us
          </Link>
          <Link
            className="footer-link"
            href="/"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Login
          </Link>
          <Link
            className="footer-link"
            href="/"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
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
