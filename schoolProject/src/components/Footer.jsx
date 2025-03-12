import { Box, Container, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
        mb: 0,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          Quick Links
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Link
            className="footer-link"
            component={RouterLink}
            to="/"
            color="inherit"
            style={{ margin: "0 20px", textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            className="footer-link"
            component={RouterLink}
            to="/academic"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Academic
          </Link>
          <Link
            className="footer-link"
            component={RouterLink}
            to="/admission"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Admission
          </Link>
          <Link
            className="footer-link"
            component={RouterLink}
            to="/contribute"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Contribute
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link
            className="footer-link"
            component={RouterLink}
            to="/contact"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Contact Us
          </Link>
          <Link
            className="footer-link"
            component={RouterLink}
            to="admin/login"
            color="inherit"
            sx={{ mx: 5, textDecoration: "none" }}
          >
            Login
          </Link>
          {/* <Link
            className='footer-link'
            component={RouterLink}
            to='admin/signup'
            color='inherit'
            sx={{ mx: 5, textDecoration: 'none' }}
          >
            Admin Sign Up
          </Link> */}
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
