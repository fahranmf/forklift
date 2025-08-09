import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />

      {/* Semua route di dalam ProtectedRoute butuh login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
