import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import DriverManagement from './pages/DriverManagement';
import Vehicle from './pages/asset/ByVehicle';
import Fleet from './pages/asset/ByFleet';
import Map from './pages/asset/Map';


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
        <Route path="/" element={<Home />} />
        <Route path="/driver-management" element={<DriverManagement />} />
        <Route path="/asset/vehicle" element={<Vehicle />} />
        <Route path="/asset/fleet" element={<Fleet />} />
        <Route path="/asset/map" element={<Map />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
