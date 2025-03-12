import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Login from "./components/admin/Login";
import AdminSignUp from "./components/admin/AdminSignUp";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

// Admin components
import Dashboard from "../src/components/admin/Dashboard";
// import NewsManager from '../src/components/admin/NewsManager';
// import AcademicsManager from './components/admin/AcademicsManager';
// import SportsManager from './components/admin/SportsManager';
// import FormSubmissions from './components/admin/FormSubmissions';
// import UserManager from './components/admin/UserManager';

// Admin route protection
const AdminRoute = ({ children }) => {
  const { currentUser, userRole, loading, isAdmin } = useAuth();

  console.log("AdminRoute check:", {
    currentUser: currentUser?.email,
    userRole,
    isAdmin,
    loading,
  });

  if (loading) {
    console.log("AdminRoute: Loading...");
    return <LoadingScreen />;
  }

  if (!currentUser) {
    console.log("AdminRoute: No user, redirecting to login");
    return <Navigate to="/admin/login" />;
  }

  if (userRole !== "admin") {
    console.log("AdminRoute: Not admin, redirecting to home");
    return <Navigate to="/" />;
  }

  console.log("AdminRoute: Rendering children");
  return children;
};

import PasswordReset from "./components/admin/PasswordReset";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div className="content-container">
          <Routes>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="admission" element={<Admission />} />
            <Route path="academic" element={<Academic />} />
            <Route path="sports" element={<Sports />} />
            <Route path="contribute" element={<Contribute />} />
            <Route path="contact" element={<Contact />} />
            {/* Auth Routes */}
            <Route path="admin/login" element={<Login />} />
            <Route path="admin/signup" element={<AdminSignUp />} />
            <Route path="admin/reset-password" element={<PasswordReset />} />
            {/* Admin Routes - Protected */}
            <Route
              path="admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
