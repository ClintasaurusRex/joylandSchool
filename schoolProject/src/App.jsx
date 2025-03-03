import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "../src/pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes></Routes>
    </Router>
  );
}

export default App;
{
  /* <Route index element={<Home />} />
<Route path="about" element={<About />} />
<Route path="admission" element={<Admission />} />
<Route path="academic" element={<Academic />} />
<Route path="sports" element={<Sports />} />
<Route path="contribute" element={<Contribute />} />
<Route path="contact" element={<Contact />} />  */
}
