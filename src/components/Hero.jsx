import React from 'react';

export default function () {
  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center flex items-center justify-center text-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')",
      }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-2xl mx-auto text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Dream Home with{' '}
          <span className="text-teal-400">HomeLink</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Browse thousands of homes for rent and sale. Trusted by people
          everywhere to connect landlords and tenants directly.
        </p>
        <div className="space-x-4">
          <a
            href="#listings"
            className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
            Explore Listings
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-gray-800 transition">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
