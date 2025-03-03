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
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li>
            <a className="nav-link" href="/admission">
              Admission
            </a>
          </li>
          <li>
            <a className="nav-link" href="/academic">
              Academic
            </a>
          </li>
          <li>
            <a className="nav-link" href="/sports">
              Sports
            </a>
          </li>
          <li>
            <a className="nav-link" href="/contribute">
              Contribute
            </a>
          </li>
          <li>
            <a className="nav-link" href="/contact">
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
