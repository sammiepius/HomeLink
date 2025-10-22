// import React, { useState } from "react";
// import { Plus, Edit, Eye, Settings } from "lucide-react";
// import axios from "axios";

// const LandlordProfile = ({ landlord, properties, onNewListing }) => {
//   const [showSettings, setShowSettings] = useState(false);
//   const [preview, setPreview] = useState(landlord?.photo || "");
//   const [formData, setFormData] = useState({
//     name: landlord?.name || "",
//     phone: landlord?.phone || "",
//     email: landlord?.email || "",
//     photo: null,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, photo: file });
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("phone", formData.phone);
//       data.append("email", formData.email);
//       if (formData.photo) data.append("photo", formData.photo);

//       const token = localStorage.getItem("token");

//       const res = await axios.put("http://localhost:5000/api/auth/update", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Profile updated successfully!");
//       setShowSettings(false);
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//       alert("❌ Update failed. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       {/* Profile Header */}
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-100 relative">
//         <button
//           onClick={() => setShowSettings(true)}
//           className="absolute top-5 right-5 text-gray-500 hover:text-teal-600"
//         >
//           <Settings size={22} />
//         </button>

//         <div className="flex items-center space-x-6">
//           <img
//             src={preview || "https://via.placeholder.com/100"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 shadow-md"
//           />
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800">{landlord?.name}</h2>
//             <p className="text-gray-600">{landlord?.email}</p>
//             <p className="text-gray-600 mt-1">📞 {landlord?.phone || "Not provided"}</p>
//           </div>
//           <button
//             onClick={onNewListing}
//             className="ml-auto bg-teal-600 text-white px-5 py-2 rounded-xl flex items-center hover:bg-teal-700 transition-all"
//           >
//             <Plus size={18} className="mr-2" /> New Listing
//           </button>
//         </div>
//       </div>

//       {/* Property Listings */}
//       <div className="max-w-5xl mx-auto">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">My Posted Apartments</h3>

//         {properties && properties.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map((property) => (
//               <div
//                 key={property.id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 p-5 flex flex-col justify-between"
//               >
//                 <div>
//                   <img
//                     src={
//                       property.images
//                         ? JSON.parse(property.images)[0]
//                         : "https://via.placeholder.com/400x250"
//                     }
//                     alt={property.title}
//                     className="rounded-xl mb-4 h-48 w-full object-cover"
//                   />
//                   <h4 className="text-lg font-semibold text-gray-800 mb-1">{property.title}</h4>
//                   <p className="text-teal-600 font-bold mb-1">
//                     ₦{property.price.toLocaleString()}/mo
//                   </p>
//                   <p className="text-gray-500">{property.location}</p>
//                 </div>

//                 <div className="flex justify-between mt-4">
//                   <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
//                     <Eye size={18} className="mr-2" /> View
//                   </button>
//                   <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all">
//                     <Edit size={18} className="mr-2" /> Edit
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">You haven’t posted any properties yet.</p>
//         )}
//       </div>

//       {/* Profile Settings Modal */}
//       {showSettings && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
//             <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="text-gray-600 block mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-600 block mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-600 block mb-1">Profile Photo</label>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-24 h-24 rounded-full object-cover mt-3 border-2 border-teal-500"
//                   />
//                 )}
//               </div>

//               <div className="flex justify-end mt-6 space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowSettings(false)}
//                   className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LandlordProfile;

import { useState } from 'react';
import { Edit, Eye, PlusCircle, Settings } from 'lucide-react';

export default function LandlordDashboard() {
  const [landlord] = useState({
    name: 'Jane Smith',
    email: 'janesmith@email.com',
    phone: '+234 808 123 4567',
    profileImage:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80',
  });

  const [properties] = useState([
    {
      id: 1,
      title: '3-Bedroom Duplex',
      price: '₦2,500,000',
      location: 'Abuja',
      image:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: '1-Bedroom Flat',
      price: '₦900,000',
      location: 'Lagos',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: '1-Bedroom Flat',
      price: '₦900,000',
      location: 'Lagos',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: '1-Bedroom Flat',
      price: '₦900,000',
      location: 'Lagos',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={landlord.profileImage}
            alt={landlord.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-md"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {landlord.name}
            </h2>
            <p className="text-gray-600 mt-1">{landlord.email}</p>
            <p className="text-gray-600 mt-1">{landlord.phone}</p>
          </div>
          <div className="flex px-5 py-3 text-gray-700 hover:text-teal-600 cursor-pointer">
            <Settings size={16} className="mr-2" />
          </div>
        </div>

        {/* Property List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              My Posted Apartments
            </h3>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <PlusCircle size={18} />
              Add Listing
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {property.location}
                  </p>
                  <p className="text-teal-600 font-bold mt-2">
                    {property.price}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-gray-700 text-sm">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2 text-sm">
                      <Edit size={16} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
