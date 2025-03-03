import "../styles/Navbar.scss";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-container">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <a href="/">
            <h1>NewJoyland</h1>
          </a>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-line ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
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
        </div>
      </nav>

      <main>{/* Your page content goes here */}</main>
    </div>
  );
}

export default Navbar;
