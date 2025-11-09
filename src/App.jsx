import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandlordProfile from './pages/LandlordProfile';
import UserProfile from './pages/UserProfile';
import AddProperty from './pages/properties/AddProperties';
import Properties from './pages/properties/Properties';
// import Properties from './pages/properties/Properties';
import PropertyDetails from './pages/properties/PropertyDetails';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './pages/Settings';
import { Toaster } from 'sonner';
import EditProperty from './pages/properties/EditProperties';
import Footer from './components/footer';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:type" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/landlord"
          element={
            <ProtectedRoute allowedRoles={['LANDLORD']}>
              <LandlordProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlordsettings"
          // element={<Settings role="Landlord" />}
          element={
            <ProtectedRoute allowedRoles={['LANDLORD']}>
              <Settings role="Landlord" />
            </ProtectedRoute>
          }
        />
        <Route path="/usersettings" element={<Settings role="tenant" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/properties" element={<Properties />} />
        <Route
          path="/addproperties"
          element={
            <ProtectedRoute allowedRoles={['LANDLORD']}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editproperties/:id"
          element={
            <ProtectedRoute allowedRoles={['LANDLORD']}>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
