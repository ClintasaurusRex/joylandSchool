import "../styles/Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-container">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <h1>NewJoyland</h1>
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
            <Link className="nav-link" to="/admission">
              Admission
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/academic">
              Academic
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
