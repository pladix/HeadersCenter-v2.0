import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Checkers from './pages/Checkers';
import ApiKeys from './pages/ApiKeys';
import Plans from './pages/Plans';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStats from './pages/admin/AdminStats';
import AdminNotifications from './pages/admin/AdminNotifications';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CheckerProvider } from './context/CheckerContext';
import { NotificationProvider } from './context/NotificationContext';
import { ApiKeyProvider } from './context/ApiKeyContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode;
  allowedRoles?: string[];
}> = ({ element, allowedRoles }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Main App Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="checkers" element={<ProtectedRoute element={<Checkers />} />} />
        <Route path="api-keys" element={<ProtectedRoute element={<ApiKeys />} />} />
        <Route path="plans" element={<ProtectedRoute element={<Plans />} />} />
        <Route path="settings" element={<ProtectedRoute element={<Settings />} />} />
        
        {/* Admin Routes */}
        <Route path="admin/users" element={
          <ProtectedRoute element={<AdminUsers />} allowedRoles={['admin']} />
        } />
        <Route path="admin/stats" element={
          <ProtectedRoute element={<AdminStats />} allowedRoles={['admin', 'support']} />
        } />
        <Route path="admin/notifications" element={
          <ProtectedRoute element={<AdminNotifications />} allowedRoles={['admin']} />
        } />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <CheckerProvider>
            <ApiKeyProvider>
              <AppRoutes />
              <Toaster position="top-right" />
            </ApiKeyProvider>
          </CheckerProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;