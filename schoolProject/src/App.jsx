import { useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
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
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/attractions">About</a>
          </li>
          <li>
            <a href="/tickets">Admission</a>
          </li>
          <li>
            <a href="/events">Academic</a>
          </li>
          <li>
            <a href="/contact">Sports</a>
          </li>
          <li>
            <a href="/contact">Contribute</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </nav>

      <main>{/* Your page content goes here */}</main>
    </div>
  );
}

export default App;
