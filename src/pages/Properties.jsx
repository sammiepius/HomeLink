// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function Listings() {
//   const navigate = useNavigate();
//   const { type } = useParams(); // can be "rent", "buy", or

//   // Dummy property data
//   const properties = [
//     {
//       id: 1,
//       title: '2 Bedroom Apartment',
//       price: '150,000',
//       location: 'Lagos, Nigeria',
//       description: 'Spacious apartment with modern finish.',
//       type: 'rent',
//       images: [
//         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
//       ],
//     },
//     {
//       id: 2,
//       title: 'Luxury Duplex',
//       price: '500,000',
//       location: 'Abuja, Nigeria',
//       description: '5-bedroom duplex in a secure estate.',
//       type: 'buy',
//       images: [
//         'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
//       ],
//     },
//     {
//       id: 3,
//       title: 'Single Room Self-Contain',
//       price: '80,000',
//       location: 'Ibadan, Nigeria',
//       description: 'Affordable single room for students.',
//       type: 'rent',
//       images: [
//         'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=800&q=80',
//       ],
//     },
//   ];

//   // State
//   const [filter, setFilter] = useState(type || 'all');
//   const [search, setSearch] = useState('');

//   // Filtering logic
//   const filteredProperties = properties.filter((p) => {
//     const matchesFilter = filter === 'all' || p.type === filter;
//     const matchesSearch =
//       p.title.toLowerCase().includes(search.toLowerCase()) ||
//       p.location.toLowerCase().includes(search.toLowerCase()) ||
//       p.description.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <div className="max-w-6xl mx-auto p-6 pt-20">
//       <h1 className="text-2xl font-bold mb-6">
//         {filter === 'rent'
//           ? 'Properties for Rent'
//           : filter === 'buy'
//           ? 'Properties for Sale'
//           : 'Available Listings'}
//       </h1>

//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by location, title, or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 border rounded px-4 py-2 focus:ring-2 focus:ring-teal-500"
//         />

//         {/* Filter Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded ${
//               filter === 'all'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}>
//             All
//           </button>
//           <button
//             onClick={() => setFilter('rent')}
//             className={`px-4 py-2 rounded ${
//               filter === 'rent'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}>
//             For Rent
//           </button>
//           <button
//             onClick={() => setFilter('buy')}
//             className={`px-4 py-2 rounded ${
//               filter === 'buy'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}>
//             For Sale
//           </button>
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((p) => (
//             <div
//               key={p.id}
//               className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">
//               <img
//                 src={p.images[0]}
//                 alt={p.title}
//                 className="h-40 w-full object-cover rounded"
//               />
//               <div className="mt-4">
//                 <h2 className="font-semibold text-lg">{p.title}</h2>
//                 <p className="text-gray-600">{p.location}</p>
//                 <p className="text-sm text-gray-500 uppercase tracking-wide">
//                   {p.type === 'rent' ? 'For Rent' : 'For Sale'}
//                 </p>
//                 <p className="text-teal-600 font-bold">
//                   ₦{p.price}
//                   {p.type === 'rent' && '/mo'}
//                 </p>
//                 <button
//                   onClick={() => navigate(`/properties/${p.id}`)}
//                   className="mt-3 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-3 text-center">
//             No properties found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { MapPin, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Listings() {
  // const [filter, setFilter] = useState(type || 'all');
  // const [search, setSearch] = useState('');
  const { type } = useParams(); // can be "rent", "buy", or
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      price: 1500000000,
      location: 'Katampe Extension, Lagos',
      beds: 5,
      baths: 6,
      name: 'Detached Duplex',
      type: 'rent',
      badge: 'One Time Payment',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1600585154154-7116f1b5b5b9?auto=format&fit=crop&w=800&q=80',
      price: 100000000,
      location: 'Tumfure, Gombe',
      beds: 3,
      baths: 3,
      name: 'Under Construction',
      type: 'buy',
      badge: 'Above Budget',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      price: 3000000000,
      location: 'Wuse 2, Abuja',
      beds: 7,
      baths: 8,
      name: 'Luxury Duplex',
      type: 'buy',
      badge: 'One Time Payment',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1600585154185-0217a4b66747?auto=format&fit=crop&w=800&q=80',
      price: 4000000000,
      location: 'Katampe Extension, Abuja',
      beds: 7,
      baths: 8,
      name: 'Luxury Mansion',
      type: 'rent',
      badge: 'Move-in Ready',
    },
  ];

  // const { type } = useParams(); // can be "rent", "buy", or
  // const navigate = useNavigate();
  const [filter, setFilter] = useState(type || 'all');
  const [search, setSearch] = useState('');

  //   // Filtering logic
  const filteredProperties = properties.filter((p) => {
    const matchesFilter = filter === 'all' || p.type === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    // p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-20">
      {/* <h1 className="text-2xl font-bold mb-6">
        {filter === 'rent'
          ? 'Properties for Rent'
          : filter === 'buy'
          ? 'Properties for Sale'
          : 'Available Listings'}
      </h1> */}
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

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        {/* <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Home className="text-teal-600" /> Available Properties
        </h1> */}
        <p className="text-gray-500 mt-1">
          Explore beautiful homes and apartments available for sale.
        </p>
      </header>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover"
                />
                {p.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${
                      p.badge === 'Above Budget'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}>
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-3 space-y-1">
                <h2 className="text-base font-semibold text-gray-900">
                  ₦{p.price.toLocaleString()}
                </h2>
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin size={12} className="mr-1" />
                  {p.location}
                </div>

                <p className="text-xs text-gray-600">
                  {p.beds} Beds • {p.baths} Baths • {p.type}
                </p>

                <button
                  onClick={() => navigate(`/properties/${p.id}`)}
                  className="mt-2 w-full py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition">
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
