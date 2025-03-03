import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Admission from "./pages/Admission";
// import Academic from "./pages/Academic";
// import Sports from "./pages/Sports";
// import Contribute from "./pages/Contribute";
// import Contact from "./pages/Contact";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="admission" element={<Admission />} />
          <Route path="academic" element={<Academic />} />
          <Route path="sports" element={<Sports />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
