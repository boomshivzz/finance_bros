import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import TopFold from './components/TopFold';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <LayoutWithConditionalTopFold />
    </BrowserRouter>
  );
}

function LayoutWithConditionalTopFold() {
  const { pathname } = useLocation();
  const showTopFold = pathname === '/';

  return (
    <>
      {showTopFold && <TopFold />}

      <Routes>
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
