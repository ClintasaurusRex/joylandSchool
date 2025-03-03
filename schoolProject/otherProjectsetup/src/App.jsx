import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import all pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
// Import other pages as you create them

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Add routes for other pages */}
          <Route
            path="/academics"
            element={
              <div className="container mx-auto p-8">
                <h1 className="text-4xl">Academics Page</h1>
                <p>This page is under construction.</p>
              </div>
            }
          />
          <Route
            path="/admission"
            element={
              <div className="container mx-auto p-8">
                <h1 className="text-4xl">Admission Page</h1>
                <p>This page is under construction.</p>
              </div>
            }
          />
          <Route
            path="/sports"
            element={
              <div className="container mx-auto p-8">
                <h1 className="text-4xl">Sports Page</h1>
                <p>This page is under construction.</p>
              </div>
            }
          />
          <Route
            path="/news"
            element={
              <div className="container mx-auto p-8">
                <h1 className="text-4xl">News Page</h1>
                <p>This page is under construction.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
