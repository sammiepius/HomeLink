import React from 'react';
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Listings from '../components/Listings';

export default function HomePage() {
  return (
    <div className="font-sans">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Listings />
    </div>
  );
}
