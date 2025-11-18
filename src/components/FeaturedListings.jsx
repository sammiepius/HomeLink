// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {
//   FaBed,
//   FaBath,
//   FaMapMarkerAlt,
//   FaChevronLeft,
//   FaChevronRight,
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// export default function Listings() {
//   const [properties, setProperties] = useState([]);
//   const [currentImg, setCurrentImg] = useState({});
//   const [loading, setLoading] = useState(true);
//   // const [page, setPage] = useState(1);

//   const navigate = useNavigate();
//   const itemsPerPage = 6; // adjust for your design

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

//   // const paginated = properties.slice(
//   //   (page - 1) * itemsPerPage,
//   //   page * itemsPerPage
//   // );
//   // const totalPages = Math.ceil(properties.length / itemsPerPage);

//   const nextImg = (id, total) => {
//     setCurrentImg((prev) => ({
//       ...prev,
//       [id]: prev[id] + 1 >= total ? 0 : prev[id] + 1,
//     }));
//   };

//   const prevImg = (id, total) => {
//     setCurrentImg((prev) => ({
//       ...prev,
//       [id]: prev[id] - 1 < 0 ? total - 1 : prev[id] - 1,
//     }));
//   };

//   if (loading)
//     return <p className="text-center py-20">Loading properties...</p>;

//   return (
//     <section id="listings" className="py-20 bg-white">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
//           Featured <span className="text-teal-600">Listings</span>
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {properties.map((property) => {
//             const images = property.images?.length
//               ? property.images
//               : ['https://placehold.co/600x400?text=No+Image'];
//             const current = currentImg[property.id] ?? 0;

//             return (
//               <div
//                 key={property.id}
//                 onClick={() => navigate(`/property/${property.id}`)}
//                 className="max-w-[330px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//                 {/* IMAGE SECTION */}
//                 <div className="relative h-56 w-full">
//                   {/* IMAGE */}
//                   <img
//                     src={images[current]}
//                     alt={property.title}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* RIBBON BADGE */}
//                   <div className="absolute top-0 left-0">
//                     <div className="relative">
//                       <span className="bg-red-600 text-white px-5 py-1 text-sm font-semibold ribbon-left">
//                         {property.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* NAV BUTTONS (LEFT/RIGHT) */}
//                   {images.length > 1 && (
//                     <>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           prevImg(property.id, images.length);
//                         }}
//                         className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
//                         <FaChevronLeft />
//                       </button>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           nextImg(property.id, images.length);
//                         }}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
//                         <FaChevronRight />
//                       </button>
//                     </>
//                   )}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5">
//                   {/* <h3 className="text-lg font-semibold mb-1">{property.title}</h3> */}

//                   <div className="flex items-center text-gray-600 mb-3">
//                     <FaMapMarkerAlt className="mr-2 text-teal-600" />
//                     <span>{property.location || 'Unknown location'}</span>
//                   </div>

//                   {/* <p className="text-xl font-bold text-gray-800 mb-3">
//                     ₦{Number(property.price).toLocaleString()}
//                   </p> */}

//                   {/* BED / BATH ICONS */}
//                   <div className="flex items-center justify-between text-gray-600 text-sm">
//                     <span className="flex items-center">
//                       <FaBed className="mr-1 text-teal-600" />{' '}
//                       {property.bedrooms || 0} Beds
//                     </span>
//                     <span className="flex items-center">
//                       <FaBath className="mr-1 text-teal-600" />{' '}
//                       {property.bathrooms || 0} Baths
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* PAGINATION
//         <div className="flex justify-center items-center gap-3 mt-10">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40">
//             Prev
//           </button>

//           <span className="font-semibold text-gray-700">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40">
//             Next
//           </button>
//         </div> */}
//       </div>
//     </section>
//   );
// }
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, BedDouble, Bath } from 'lucide-react';

// export default function Listings() {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/properties');
//         setProperties(res.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };
//     fetchProperties();
//   }, []);

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
//           Featured <span className="text-teal-600">Listings</span>
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {properties.map((item) => (
//             <PropertyCard key={item.id} property={item} navigate={navigate} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function getBadgeColor(text) {
//   if (!text) return 'bg-gray-800';

//   const t = text.toLowerCase();

//   if (t.includes('affordable')) return 'bg-green-600';
//   if (t.includes('payment')) return 'bg-blue-600';
//   if (t.includes('sale')) return 'bg-purple-600';
//   if (t.includes('rent')) return 'bg-orange-600';

//   return 'bg-gray-700';
// }

// function PropertyCard({ property, navigate }) {
//   const [index, setIndex] = useState(0);
//   const images = property.images?.length
//     ? property.images
//     : ['https://placehold.co/600x400?text=No+Image'];

//   const nextImage = (e) => {
//     e.stopPropagation();
//     setIndex((index + 1) % images.length);
//   };

//   const prevImage = (e) => {
//     e.stopPropagation();
//     setIndex((index - 1 + images.length) % images.length);
//   };

//   return (
//     <div
//       onClick={() => navigate(`/property/${property.id}`)}
//       className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition">
//       {/* Image Wrapper */}
//       <div className="relative h-60 w-full overflow-hidden">
//         {/* Main Image */}
//         <img
//           src={images[index]}
//           className="w-full h-full object-cover transition-all duration-300"
//         />

//         {/* LEFT ARROW */}
//         {images.length > 1 && (
//           <button
//             onClick={prevImage}
//             className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
//             ‹
//           </button>
//         )}

//         {/* RIGHT ARROW */}
//         {images.length > 1 && (
//           <button
//             onClick={nextImage}
//             className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
//             ›
//           </button>
//         )}

//         {/* PAGINATION DOTS */}
//         {images.length > 1 && (
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//             {images.map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-2 w-2 rounded-full ${
//                   i === index ? 'bg-white' : 'bg-white/50'
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* COLORFUL BADGE */}
//         <div
//           className={`${getBadgeColor(
//             property.badge || property.type
//           )} absolute top-3 left-3 text-white px-3 py-1 rounded-full text-sm shadow`}>
//           {property.badge ||
//             (property.type === 'rent' ? 'For Rent' : 'For Sale')}
//         </div>

//         {/* PRICE TAG */}
//         <div className="absolute bottom-3 left-3 bg-black/70 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
//           ₦{Number(property.price).toLocaleString()}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-5">
//         {/* LOCATION */}
//         <p className="text-gray-900 font-semibold text-lg flex items-center gap-2">
//           <MapPin size={18} className="text-teal-600" />
//           {property.location}
//         </p>

//         {/* TITLE */}
//         {/* <p className="text-gray-700 mt-1">{property.title}</p> */}

//         {/* BED / BATH / TYPE */}
//         <div className="flex items-center gap-6 mt-3 text-gray-600">
//           <div className="flex items-center gap-1">
//             <BedDouble size={17} className="text-gray-700" />
//             <span>{property.bedrooms} Bed</span>
//           </div>

//           <div className="flex items-center gap-1">
//             <Bath size={17} className="text-gray-700" />
//             <span>{property.bathrooms} Bath</span>
//           </div>

//           {/* <span className="text-gray-700 capitalize">
//             {property.typeName || property.type}
//           </span> */}
//         </div>

//         {/* STATUS */}
//         {/* <div className="mt-4 flex items-center gap-2 text-sm text-green-700 font-medium">
//           <span>✔</span>
//           {property.status || "Move In Ready"}
//         </div> */}
//       </div>
//     </div>
//   );
// }

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from 'react-icons/fa';

export default function Listings() {
  const [properties, setProperties] = useState([]);
  const [imageIndex, setImageIndex] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);

        // Initialize image index for each property
        const initialIndexes = {};
        res.data.forEach((p) => {
          const id = p._id || p.id;
          initialIndexes[id] = 0;
        });

        setImageIndex(initialIndexes);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // NEXT IMAGE
  const nextImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % total,
    }));
  };

  // PREVIOUS IMAGE
  const prevImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + total) % total,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600">
        Loading properties...
      </div>
    );
  }

  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Featured <span className="text-teal-600">Listings</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {properties.map((p) => {
            const id = p._id || p.id; // Ensure stable ID
            const current = imageIndex[id] ?? 0;

            const images = p.images?.length
              ? p.images
              : ['https://placehold.co/600x400?text=No+Image'];

            return (
              <div
                key={id}
                onClick={() => navigate(`/properties/${id}`)}
                className="w-[90%] sm:w-[100%] bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden">
                <div className="relative w-full h-52 overflow-hidden">
                  {/* IMAGE */}
                  <img
                    src={images[current]}
                    alt={p.title}
                    className="w-full h-full object-cover transition duration-300"
                  />

                  {/* LEFT BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(id, images.length);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
                    <FaChevronLeft />
                  </button>

                  {/* RIGHT BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(id, images.length);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
                    <FaChevronRight />
                  </button>

                  {/* RIBBON BADGE */}
                  <div className="absolute top-3 left-0 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-1 text-sm font-bold -skew-x-12 shadow-md">
                    <span className="skew-x-12 inline-block">
                      {p.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                    </span>
                  </div>

                  {/* PRICE BADGE */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                    ₦{Number(p.price).toLocaleString()}
                  </div>
                </div>
                {/* CONTENT */}
                <div className="p-3">
                  {/* <h3 className="text-lg font-bold text-gray-800 mb-1">{p.title}</h3> */}
                  <div className="flex font-bold items-center text-gray-500 text-sm mb-2">
                    <FaHome className="mr-1 text-teal-600" />
                    {p.title}
                  </div>

                  <div className="flex font-bold items-center text-gray-500 text-sm mb-2">
                    <FaMapMarkerAlt className="mr-1 text-teal-600" />
                    {p.location || 'Unknown Location'}
                  </div>
                  {/* 
                  <p className="text-xl font-semibold text-gray-800 mb-3">
                    ₦{Number(p.price).toLocaleString()}
                  </p> */}

                  <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <FaBed className="text-teal-600" /> {p.bedrooms || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="text-teal-600" /> {p.bathrooms || 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
