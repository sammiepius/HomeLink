// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function PropertyDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Same dummy data (later you’ll fetch from backend)
//   const properties = [
//     {
//       id: 1,
//       title: '2 Bedroom Apartment',
//       price: '150,000',
//       location: 'Lagos, Nigeria',
//       description:
//         'Spacious apartment with modern finish, close to amenities and public transport.',
//       type: 'rent',
//       images: [
//         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
//         'https://images.unsplash.com/photo-1600585154207-8fe03a332b21?auto=format&fit=crop&w=1000&q=80',
//       ],
//     },
//     {
//       id: 2,
//       title: 'Luxury Duplex',
//       price: '500,000',
//       location: 'Abuja, Nigeria',
//       description:
//         '5-bedroom duplex in a secure estate with private parking and swimming pool.',
//       type: 'buy',
//       images: [
//         'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
//         'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=1000&q=80',
//       ],
//     },
//     {
//       id: 3,
//       title: 'Single Room Self-Contain',
//       price: '80,000',
//       location: 'Ibadan, Nigeria',
//       description:
//         'Affordable single room for students, close to university and public transport.',
//       type: 'rent',
//       images: [
//         'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=1000&q=80',
//       ],
//     },
//   ];

//   const property = properties.find((p) => p.id === parseInt(id));

//   if (!property) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center">
//         <h2 className="text-2xl font-bold">Property Not Found</h2>
//         <button
//           onClick={() => navigate('/properties')}
//           className="mt-4 px-6 py-2 bg-teal-600 text-white rounded">
//           Back to Listings
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate('/properties')}
//         className="mb-6 text-teal-600 hover:underline">
//         ← Back to Listings
//       </button>

//       {/* Property Title */}
//       <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
//       <p className="text-gray-600 mb-4">{property.location}</p>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         {property.images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`${property.title} ${index + 1}`}
//             className="rounded-lg object-cover w-full h-64"
//           />
//         ))}
//       </div>

//       {/* Details */}
//       <div className="bg-white shadow p-6 rounded-lg">
//         <p className="text-gray-700 mb-4">{property.description}</p>
//         <p className="text-sm text-gray-500 uppercase">
//           {property.type === 'rent' ? 'For Rent' : 'For Sale'}
//         </p>
//         <p className="text-teal-600 font-bold text-xl">
//           ₦{property.price}
//           {property.type === 'rent' && '/mo'}
//         </p>

//         {/* Action Buttons */}
//         <div className="mt-6 flex gap-4">
//           <button className="flex-1 bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
//             Contact Landlord
//           </button>
//           <button className="flex-1 border border-teal-600 text-teal-600 py-2 rounded hover:bg-teal-50">
//             Save Listing
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading property details...</p>;
  if (!property) return <p className="text-center mt-10">Property not found.</p>;

  // Handle images (stringified JSON or array)
  const images = Array.isArray(property.images)
    ? property.images
    : JSON.parse(property.images || "[]");

  return (
    <section className="min-h-screen bg-gray-50 pt-20 pb-12 px-6">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
            {property.type === "rent" ? "For Rent" : "For Sale"}
          </div>
        </div>

        {/* Details */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h2>
          <p className="text-gray-500 text-lg mb-3">{property.location}</p>
          <p className="text-2xl font-semibold text-teal-700 mb-6">
            ₦{property.price.toLocaleString()}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <span>🛏️ {property.bedrooms || 0} Bedrooms</span>
            <span>🛁 {property.bathrooms || 0} Bathrooms</span>
            <span>📏 Spacious Apartment</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-10">
            {property.description || "No description provided."}
          </p>

          {/* Contact Landlord */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => alert("Contact feature coming soon!")}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
            >
              📞 Contact Landlord
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Extra Images Gallery */}
        {images.length > 1 && (
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">More Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`property-${index}`}
                  className="w-full h-40 object-cover rounded-lg shadow-sm hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
