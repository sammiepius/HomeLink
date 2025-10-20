import React, { useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Listings() {
  const { type } = useParams();
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154185-0217a4b66747?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
      ],
      price: 1500000000,
      location: "Katampe Extension, Lagos",
      beds: 5,
      baths: 6,
      name: "Detached Duplex",
      type: "rent",
      badge: "One Time Payment",
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1600585154154-7116f1b5b5b9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154311-ef5f6c7f0f29?auto=format&fit=crop&w=800&q=80",
      ],
      price: 100000000,
      location: "Tumfure, Gombe",
      beds: 3,
      baths: 3,
      name: "Under Construction",
      type: "buy",
      badge: "Above Budget",
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154185-0217a4b66747?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
      ],
      price: 3000000000,
      location: "Wuse 2, Abuja",
      beds: 7,
      baths: 8,
      name: "Luxury Duplex",
      type: "buy",
      badge: "One Time Payment",
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154154-7116f1b5b5b9?auto=format&fit=crop&w=800&q=80",
      ],
      price: 4000000000,
      location: "Katampe Extension, Abuja",
      beds: 7,
      baths: 8,
      name: "Luxury Mansion",
      type: "rent",
      badge: "Move-in Ready",
    },
  ];

  const [filter, setFilter] = useState(type || "all");
  const [search, setSearch] = useState("");
  const [activeImage, setActiveImage] = useState({});
  const [fade, setFade] = useState({});

  // Filtering logic
  const filteredProperties = properties.filter((p) => {
    const matchesFilter = filter === "all" || p.type === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleHoverStart = (id, length) => {
    const interval = setInterval(() => {
      setFade((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setActiveImage((prev) => ({
          ...prev,
          [id]: ((prev[id] || 0) + 1) % length,
        }));
        setFade((prev) => ({ ...prev, [id]: false }));
      }, 300); // fade duration
    }, 2000);
    setActiveImage((prev) => ({ ...prev, [`${id}_interval`]: interval }));
  };

  const handleHoverEnd = (id) => {
    const interval = activeImage[`${id}_interval`];
    if (interval) clearInterval(interval);
  };

  const prevImage = (id, length) => {
    setFade((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveImage((prev) => ({
        ...prev,
        [id]: ((prev[id] || 0) - 1 + length) % length,
      }));
      setFade((prev) => ({ ...prev, [id]: false }));
    }, 300);
  };

  const nextImage = (id, length) => {
    setFade((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveImage((prev) => ({
        ...prev,
        [id]: ((prev[id] || 0) + 1) % length,
      }));
      setFade((prev) => ({ ...prev, [id]: false }));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-25">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location, title, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border rounded px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />

        <div className="flex gap-3">
          {["all", "rent", "buy"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {f === "all" ? "All" : f === "rent" ? "For Rent" : "For Sale"}
            </button>
          ))}
        </div>
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => {
            const index = activeImage[p.id] || 0;
            return (
              <div
                key={p.id}
                onMouseEnter={() => handleHoverStart(p.id, p.images.length)}
                onMouseLeave={() => handleHoverEnd(p.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Image section */}
                <div className="relative group overflow-hidden">
                  <img
                    src={p.images[index]}
                    alt={p.name}
                    className={`h-44 w-full object-cover transition-opacity duration-500 ease-in-out ${
                      fade[p.id] ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Arrows (visible on hover) */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                      onClick={() => prevImage(p.id, p.images.length)}
                      className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg z-30"
                    >
                      <ChevronLeft size={20} strokeWidth={3} />
                    </button>

                    <button
                      onClick={() => nextImage(p.id, p.images.length)}
                      className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg z-30"
                    >
                      <ChevronRight size={20} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Badge */}
                  {p.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${
                        p.badge === "Above Budget"
                          ? "bg-red-100 text-red-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
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
                    className="mt-2 w-full py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function Listings() {
//   const { type } = useParams();
//   const navigate = useNavigate();

//   const properties = [
//     {
//       id: 1,
//       images: [
//         "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154185-0217a4b66747?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
//       ],
//       price: 1500000000,
//       location: "Katampe Extension, Lagos",
//       beds: 5,
//       baths: 6,
//       name: "Detached Duplex",
//       type: "rent",
//       badge: "One Time Payment",
//     },
//     {
//       id: 2,
//       images: [
//         "https://images.unsplash.com/photo-1600585154154-7116f1b5b5b9?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154311-ef5f6c7f0f29?auto=format&fit=crop&w=800&q=80",
//       ],
//       price: 100000000,
//       location: "Tumfure, Gombe",
//       beds: 3,
//       baths: 3,
//       name: "Under Construction",
//       type: "buy",
//       badge: "Above Budget",
//     },
//     {
//       id: 3,
//       images: [
//         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154185-0217a4b66747?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
//       ],
//       price: 3000000000,
//       location: "Wuse 2, Abuja",
//       beds: 7,
//       baths: 8,
//       name: "Luxury Duplex",
//       type: "buy",
//       badge: "One Time Payment",
//     },
//     {
//       id: 4,
//       images: [
//         "https://images.unsplash.com/photo-1600585154235-4d13e408b2d6?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1600585154154-7116f1b5b5b9?auto=format&fit=crop&w=800&q=80",
//       ],
//       price: 4000000000,
//       location: "Katampe Extension, Abuja",
//       beds: 7,
//       baths: 8,
//       name: "Luxury Mansion",
//       type: "rent",
//       badge: "Move-in Ready",
//     },
//   ];

//   const [filter, setFilter] = useState(type || "all");
//   const [search, setSearch] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState({});

//   const filteredProperties = properties.filter((p) => {
//     const matchesFilter = filter === "all" || p.type === filter;
//     const matchesSearch =
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.location.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const nextImage = (id, length) => {
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] === undefined ? 1 : (prev[id] + 1) % length,
//     }));
//   };

//   const prevImage = (id, length) => {
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [id]:
//         prev[id] === undefined
//           ? length - 1
//           : (prev[id] - 1 + length) % length,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 md:p-20">
//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by location, title, or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
//         />

//         <div className="flex gap-3">
//           {["all", "rent", "buy"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-4 py-2 rounded-lg ${
//                 filter === f
//                   ? "bg-teal-600 text-white"
//                   : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               {f === "all" ? "All" : f === "rent" ? "For Rent" : "For Sale"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((p) => {
//             const index = currentImageIndex[p.id] || 0;
//             return (
//               <div
//                 key={p.id}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
//               >
//                 {/* Image Slider */}
//                 <div className="relative group overflow-hidden">
//                   <img
//                     src={p.images[index]}
//                     alt={p.name}
//                     className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />

//                   {/* Arrows visible only on hover */}
//                   <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//                     <button
//                       onClick={() => prevImage(p.id, p.images.length)}
//                       className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg z-30"
//                     >
//                       <ChevronLeft size={20} strokeWidth={3} />
//                     </button>

//                     <button
//                       onClick={() => nextImage(p.id, p.images.length)}
//                       className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg z-30"
//                     >
//                       <ChevronRight size={20} strokeWidth={3} />
//                     </button>
//                   </div>

//                   {/* Badge */}
//                   {p.badge && (
//                     <span
//                       className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium z-30 ${
//                         p.badge === "Above Budget"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-teal-100 text-teal-700"
//                       }`}
//                     >
//                       {p.badge}
//                     </span>
//                   )}
//                 </div>

//                 {/* Details */}
//                 <div className="p-3 space-y-1">
//                   <h2 className="text-base font-semibold text-gray-900">
//                     ₦{p.price.toLocaleString()}
//                   </h2>
//                   <div className="flex items-center text-gray-500 text-xs">
//                     <MapPin size={12} className="mr-1" />
//                     {p.location}
//                   </div>
//                   <p className="text-xs text-gray-600">
//                     {p.beds} Beds • {p.baths} Baths • {p.type}
//                   </p>

//                   <button
//                     onClick={() => navigate(`/properties/${p.id}`)}
//                     className="mt-2 w-full py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 col-span-4 text-center">
//             No properties found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

