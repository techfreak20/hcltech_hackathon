import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Goals from './pages/Goals';
import Messages from './pages/Messages';

// 1. Public Route (For Login/Register)
// If user is ALREADY logged in, redirect them to Dashboard immediately
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  // Show nothing or a spinner while checking auth state
  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  
  return user ? <Navigate to="/dashboard" replace /> : children;
};

// 2. Private Route (For Dashboard/Profile)
// If user is NOT logged in, redirect to Login
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  
  return user ? children : <Navigate to="/login" replace />;
};

// 3. Root Redirect Handler
// Decides where to go when visiting "/"
const RootRedirect = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes (Redirect to Dashboard if already logged in) */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />

          {/* Smart Root Redirect */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Catch-all for 404s - Redirect to root logic */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;