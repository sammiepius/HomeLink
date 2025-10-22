// import React, { useEffect, useState } from 'react';
// import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function Listings() {
//   const { type } = useParams();
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState(type || 'all');
//   const [search, setSearch] = useState('');
//   const [activeImage, setActiveImage] = useState({});
//   const [properties, setProperties] = useState([]);
//   const [fade, setFade] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/properties');
//         setProperties(res.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Filtering logic
//   const filteredProperties = properties.filter((p) => {
//     const matchesFilter = filter === 'all' || p.type === filter;
//     const matchesSearch =
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.location.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const handleHoverStart = (id, length) => {
//     const interval = setInterval(() => {
//       setFade((prev) => ({ ...prev, [id]: true }));
//       setTimeout(() => {
//         setActiveImage((prev) => ({
//           ...prev,
//           [id]: ((prev[id] || 0) + 1) % length,
//         }));
//         setFade((prev) => ({ ...prev, [id]: false }));
//       }, 300); // fade duration
//     }, 2000);
//     setActiveImage((prev) => ({ ...prev, [`${id}_interval`]: interval }));
//   };

//   const handleHoverEnd = (id) => {
//     const interval = activeImage[`${id}_interval`];
//     if (interval) clearInterval(interval);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 md:p-25">
//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by location, title, or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 border rounded px-4 py-2 focus:ring-2 focus:ring-teal-500"
//         />

//         <div className="flex gap-3">
//           {['all', 'rent', 'buy'].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-4 py-2 rounded ${
//                 filter === f
//                   ? 'bg-teal-600 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300'
//               }`}>
//               {f === 'all' ? 'All' : f === 'rent' ? 'For Rent' : 'For Sale'}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((p) => {
//             const index = activeImage[p.id] || 0;
//             return (
//               <div
//                 key={p.id}
//                 onMouseEnter={() => handleHoverStart(p.id, p.images.length)}
//                 onMouseLeave={() => handleHoverEnd(p.id)}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
//                 {/* Image section */}
//                 <div className="relative group overflow-hidden">
//                   <img
//                     src={p.images[index]}
//                     alt={p.name}
//                     className={`h-44 w-full object-cover transition-opacity duration-500 ease-in-out ${
//                       fade[p.id] ? 'opacity-0' : 'opacity-100'
//                     }`}
//                   />
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
//                     className="mt-2 w-full py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 col-span-3 text-center">
//             No properties found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Listings() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState(type || 'all');
  const [search, setSearch] = useState('');
  const [activeImage, setActiveImage] = useState({});
  const [fade, setFade] = useState({});
  const [properties, setProperties] = useState([]);
  const [intervals, setIntervals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();

    // Cleanup on unmount — stop all intervals
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  const filteredProperties = properties.filter((p) => {
    const matchesFilter = filter === 'all' || p.type === filter;
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle hover start (auto-slideshow)
  const handleHoverStart = (id, length) => {
    if (intervals[id]) return; // prevent multiple timers
    const interval = setInterval(() => {
      setFade((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setActiveImage((prev) => ({
          ...prev,
          [id]: ((prev[id] || 0) + 1) % length,
        }));
        setFade((prev) => ({ ...prev, [id]: false }));
      }, 300);
    }, 2000);

    setIntervals((prev) => ({ ...prev, [id]: interval }));
  };

  // Handle hover end (stop slideshow)
  const handleHoverEnd = (id) => {
    if (intervals[id]) {
      clearInterval(intervals[id]);
      setIntervals((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
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
          {['all', 'rent', 'buy'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}>
              {f === 'all' ? 'All' : f === 'rent' ? 'For Rent' : 'For Sale'}
            </button>
          ))}
        </div>
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading ? (
          <p className="text-center text-gray-500 col-span-4">Loading...</p>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((p) => {
            const index = activeImage[p.id] || 0;
            return (
              <div
                key={p.id}
                onMouseEnter={() =>
                  handleHoverStart(p.id, p.images ? p.images.length : 1)
                }
                onMouseLeave={() => handleHoverEnd(p.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Image section */}
                <div className="relative group overflow-hidden">
                  <img
                    src={
                      p.images && p.images.length > 0
                        ? p.images[index]
                        : '/placeholder.jpg'
                    }
                    alt={p.name}
                    className={`h-44 w-full object-cover transition-opacity duration-500 ease-in-out ${
                      fade[p.id] ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>

                {/* Details */}
                <div className="p-3 space-y-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    ₦{Number(p.price).toLocaleString()}
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
