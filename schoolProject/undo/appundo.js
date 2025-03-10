import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';

import Navbar from './components/Navbar';
import HomePage from '../src/pages/HomePage';
import AboutPage from '../src/pages/AboutPage';
import Admission from '../src/pages/Admission';
import Academic from '../src/pages/Academic';
import Sports from '../src/pages/Sports';
import Contribute from '../src/pages/Contribute';
import Contact from '../src/pages/ContactUs';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import AdminSignUp from './components/admin/AdminSignUp';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Admin components
import Dashboard from '../src/components/admin/Dashboard';
import NewsManager from '../src/components/admin/NewsManager';
import AcademicsManager from './components/admin/AcademicsManager';
// import SportsManager from "./components/admin/SportsManager";
// import FormSubmissions from "./components/admin/FormSubmissions";
// import UserManager from "./components/admin/UserManager";

// Admin route protection
const AdminRoute = ({ children }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || userRole !== 'admin') {
    return <Navigate to='/admin/login' />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div className='content-container'>
          <Routes>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='admission' element={<Admission />} />
            <Route path='academic' element={<Academic />} />
            <Route path='sports' element={<Sports />} />
            <Route path='contribute' element={<Contribute />} />
            <Route path='contact' element={<Contact />} />

            {/* Auth Routes */}
            <Route path='admin/login' element={<Login />} />
            <Route path='admin/signup' element={<AdminSignUp />} />

            {/* Admin Routes - Protected */}
            <Route
              path='admin/dashboard'
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path='admin/news'
              element={
                <AdminRoute>
                  <NewsManager />
                </AdminRoute>
              }
            />
            <Route
              path='admin/academics'
              element={
                <AdminRoute>
                  <AcademicsManager />
                </AdminRoute>
              }
            />
            {/* <Route
              path="admin/sports"
              element={
                <AdminRoute>
                  <SportsManager />
                </AdminRoute>
              }
            />
            <Route
              path="admin/submissions"
              element={
                <AdminRoute>
                  <FormSubmissions />
                </AdminRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <AdminRoute>
                  <UserManager />
                </AdminRoute>
              }
            /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
