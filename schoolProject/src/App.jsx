import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar";
import HomePage from "../src/pages/HomePage";
import AboutPage from "../src/pages/AboutPage";
import Admission from "../src/pages/Admission";
import Academic from "../src/pages/Academic";
import Sports from "../src/pages/Sports";
import Contribute from "../src/pages/Contribute";
import Contact from "../src/pages/ContactUs";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="content-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="admission" element={<Admission />} />
          <Route path="academic" element={<Academic />} />
          <Route path="sports" element={<Sports />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="contact" element={<Contact />} />
        </Routes>

        <footer>
          <div className="container">
            <p>© {new Date().getFullYear()} Joyland Prime Academy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
export default App;
