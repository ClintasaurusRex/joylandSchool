import { Link } from "react-router-dom";
import "../../styles/navbar.scss";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="nav-container">
        <Link className="navbar-brand " to="/">
          Joyland School
        </Link>

        <div className="navbar-nav ">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
          <Link className="nav-link" to="/academics">
            Academics
          </Link>
          <Link className="nav-link" to="/admission">
            Admission
          </Link>
          <Link className="nav-link" to="/sports">
            Sports
          </Link>
          <Link className="nav-link" to="/news">
            News
          </Link>
          <Link className="nav-link" to="/volunteer">
            Volunteer
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </div>

        <form className="d-flex ms-lg-3" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
