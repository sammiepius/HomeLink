import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Listings() {
  const navigate = useNavigate();
  const { type } = useParams(); // can be "rent", "buy", or

  // Dummy property data
  const properties = [
    {
      id: 1,
      title: '2 Bedroom Apartment',
      price: '150,000',
      location: 'Lagos, Nigeria',
      description: 'Spacious apartment with modern finish.',
      type: 'rent',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 2,
      title: 'Luxury Duplex',
      price: '500,000',
      location: 'Abuja, Nigeria',
      description: '5-bedroom duplex in a secure estate.',
      type: 'buy',
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 3,
      title: 'Single Room Self-Contain',
      price: '80,000',
      location: 'Ibadan, Nigeria',
      description: 'Affordable single room for students.',
      type: 'rent',
      images: [
        'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=800&q=80',
      ],
    },
  ];

  // State
  const [filter, setFilter] = useState(type || 'all');
  const [search, setSearch] = useState('');

  // Filtering logic
  const filteredProperties = properties.filter((p) => {
    const matchesFilter = filter === 'all' || p.type === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-6">
        {filter === 'rent'
          ? 'Properties for Rent'
          : filter === 'buy'
          ? 'Properties for Sale'
          : 'Available Listings'}
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by location, title, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border rounded px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}>
            All
          </button>
          <button
            onClick={() => setFilter('rent')}
            className={`px-4 py-2 rounded ${
              filter === 'rent'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}>
            For Rent
          </button>
          <button
            onClick={() => setFilter('buy')}
            className={`px-4 py-2 rounded ${
              filter === 'buy'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}>
            For Sale
          </button>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">
              <img
                src={p.images[0]}
                alt={p.title}
                className="h-40 w-full object-cover rounded"
              />
              <div className="mt-4">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                <p className="text-gray-600">{p.location}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {p.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                <p className="text-teal-600 font-bold">
                  ₦{p.price}
                  {p.type === 'rent' && '/mo'}
                </p>
                <button
                  onClick={() => navigate(`/properties/${p.id}`)}
                  className="mt-3 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
}
