import { useState } from "react";
import "../styles/Navbar.scss";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">
            <h1>NewJoyland</h1>
          </a>
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a class="nav-link" href="/attractions">
              About
            </a>
          </li>
          <li>
            <a class="nav-link" href="/tickets">
              Admission
            </a>
          </li>
          <li>
            <a class="nav-link" href="/events">
              Academic
            </a>
          </li>
          <li>
            <a class="nav-link" href="/contact">
              Sports
            </a>
          </li>
          <li>
            <a class="nav-link" href="/contact">
              Contribute
            </a>
          </li>
          <li>
            <a class="nav-link" href="/contact">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      <main>{/* Your page content goes here */}</main>
    </div>
  );
}

export default Navbar;
