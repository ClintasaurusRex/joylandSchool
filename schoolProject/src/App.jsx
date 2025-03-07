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
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;

{
  /* <div className="container">
  <p>© {new Date().getFullYear()} Joyland Prime Academy. All rights reserved.</p>
</div>; */
}
