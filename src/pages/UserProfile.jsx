// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';

// export default function UserProfile() {
//   return (
//     <section className="min-h-screen bg-gray-50 py-12 px-6 pt-20 flex justify-center">
//       <div className="w-full max-w-3xl space-y-8">
//         {/* Profile Info */}
//         <Card>
//           <div className="flex items-center space-x-4">
//             <img
//               src="https://via.placeholder.com/80"
//               alt="Profile"
//               className="w-20 h-20 rounded-full border"
//             />
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
//               <p className="text-gray-600">johndoe@email.com</p>
//             </div>
//           </div>
//         </Card>

//         {/* Saved Listings */}
//         <Card>
//           <h3 className="text-xl font-semibold mb-4">Saved Listings</h3>
//           <div className="space-y-4">
//             <div className="border p-4 rounded-lg flex justify-between items-center">
//               <div>
//                 <p className="font-medium">2-Bedroom Apartment</p>
//                 <p className="text-gray-600">₦1,200/mo • Lagos</p>
//               </div>
//               <Button>View</Button>
//             </div>
//             <div className="border p-4 rounded-lg flex justify-between items-center">
//               <div>
//                 <p className="font-medium">Studio Flat</p>
//                 <p className="text-gray-600">₦600/mo • Abuja</p>
//               </div>
//               <Button>View</Button>
//             </div>
//           </div>
//         </Card>

//         {/* Manage Account */}
//         <Card>
//           <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
//           <div className="space-y-3">
//             <Button className="w-full">Edit Profile</Button>
//             <Button className="w-full" variant="secondary">
//               Logout
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { Heart, MapPin } from "lucide-react";

export default function TenantProfile() {
  const savedProperties = [
    {
      id: 1,
      title: "Modern Apartment in Lekki",
      location: "Lekki, Lagos",
      price: "₦250,000 / month",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Luxury Villa in Banana Island",
      location: "Banana Island, Lagos",
      price: "₦1,200,000 / month",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Cozy Studio in Yaba",
      location: "Yaba, Lagos",
      price: "₦150,000 / month",
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-indigo-500 w-full py-10 rounded-b-3xl shadow-md flex flex-col items-center text-white">
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
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
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
                <p className="text-teal-600 font-bold mt-3">
                  {property.price}
                </p>

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
