import React from 'react';
import { Heart, MapPin, Settings } from 'lucide-react';

export default function TenantProfile() {
  const savedProperties = [
    {
      id: 1,
      title: 'Modern Apartment in Lekki',
      location: 'Lekki, Lagos',
      price: '₦250,000 / month',
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Luxury Villa in Banana Island',
      location: 'Banana Island, Lagos',
      price: '₦1,200,000 / month',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Cozy Studio in Yaba',
      location: 'Yaba, Lagos',
      price: '₦150,000 / month',
      image:
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className=" relative pt-16 min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-teal-500 to-indigo-500 w-full py-10 rounded-b-3xl shadow-md flex flex-col items-center text-white">
        {/* Settings icon in top-right */}
        <Settings className="absolute top-4 right-6 w-6 h-6 cursor-pointer hover:rotate-90 transition-transform duration-300" />

        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Tenant Avatar"
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4"
        />
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-sm text-teal-100 mb-1">johndoe@example.com</p>
        <span className="bg-white text-teal-600 px-4 py-1 rounded-full text-sm font-semibold">
          Tenant
        </span>
      </div>

      {/* Saved Properties */}
      <div className="w-full max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💖 Your Saved Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <p className="text-sm">{property.location}</p>
                </div>
                <p className="text-teal-600 font-bold mt-3">{property.price}</p>

                <button className="mt-4 w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-medium py-2 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition">
                  <Heart className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mb-10">
        Manage your dream homes from one place 🏡
      </p>
    </section>
  );
}
