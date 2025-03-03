import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">School Name</h3>
            <p>Providing quality education since [year]</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-blue-400">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-blue-400">
                  Admission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sports" className="hover:text-blue-400">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-blue-400">
                  News
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-blue-400">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p>123 School Address</p>
              <p>City, State ZIP</p>
              <p>Email: info@schoolname.edu</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>© {currentYear} School Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
