import "../styles/Navbar.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../utils/config";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth(); // Add isAdmin here
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="nav-container">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/joylandschool.png" alt="joyland picture" className="logo" />
          </Link>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/academic">
              Academic
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/admission">
              Admission
            </Link>
          </li>

          <li>
            <Link className="nav-link" to="/sports">
              Sports
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/contribute">
              Contribute
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/contact">
              Contact Us
            </Link>
          </li>

          {/* Add Admin Dashboard Link */}
          {isAdmin && (
            <li>
              <Link className="nav-link" to="/admin/dashboard">
                Admin Dashboard
              </Link>
            </li>
          )}

          {currentUser ? (
            <li>
              <a className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </li>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="admin/login">
                  Login
                </Link>
              </li>
              {/* <li>
                <Link className='nav-link' to='/signup'>
                  Sign Up
                </Link>
              </li> */}
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
