import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandlordProfile from './pages/LandlordProfile';
import UserProfile from './pages/UserProfile';
import AddProperty from './pages/AddProperties';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:type" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landlord" element={<LandlordProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addproperties" element={<AddProperty />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </Router>
  );
}

export default App;
