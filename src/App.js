import { useEffect, React } from 'react';
import { BrowserRouter, Routes, Route, useLocation,useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
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
  const navigate = useNavigate();
  const showTopFold = pathname === '/';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && pathname === '/login') {
        // User is logged in, redirect to dashboard
        navigate('/dashboard');
      }
    });

    return () => unsubscribe(); // clean up listener
  }, [navigate, pathname]);

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
