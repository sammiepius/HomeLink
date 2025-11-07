// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function PropertyDetails() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/properties/${id}`
//         );
//         setProperty(res.data);
//       } catch (error) {
//         console.error('Error fetching property:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   if (loading)
//     return <p className="text-center mt-10">Loading property details...</p>;
//   if (!property)
//     return <p className="text-center mt-10">Property not found.</p>;

//   // Handle images (stringified JSON or array)
//   const images = Array.isArray(property.images)
//     ? property.images
//     : JSON.parse(property.images || '[]');

//   return (
//     <section className="min-h-screen bg-gray-50 pt-20 pb-12 px-6">
//       {/* Hero Section */}
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
//         {/* Image Gallery */}
//         <div className="relative">
//           {images.length > 0 ? (
//             <img
//               src={images[index]}
//               alt={property.title}
//               className="w-full h-96 object-cover"
//             />
//           ) : (
//             <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
//               No Image Available
//             </div>
//           )}
//           <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
//             {property.type === 'rent' ? 'For Rent' : 'For Sale'}
//           </div>
//         </div>

//         {/* Details */}
//         <div className="p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             {property.title}
//           </h2>
//           <p className="text-gray-500 text-lg mb-3">{property.location}</p>
//           <p className="text-2xl font-semibold text-teal-700 mb-6">
//             ₦{property.price.toLocaleString()}
//           </p>

//           {/* Stats */}
//           <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
//             <span>🛏️ {property.bedrooms || 0} Bedrooms</span>
//             <span>🛁 {property.bathrooms || 0} Bathrooms</span>
//             {/* <span>📏 Spacious Apartment</span> */}
//           </div>

//           {/* Description */}
//           <p className="text-gray-700 leading-relaxed mb-10">
//             {property.description || 'No description provided.'}
//           </p>

//           {/* Contact Landlord */}
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => alert('Contact feature coming soon!')}
//               className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition">
//               📞 Contact Landlord
//             </button>
//             <button
//               onClick={() => window.history.back()}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
//               ← Go Back
//             </button>
//           </div>
//         </div>

//         {/* Extra Images Gallery */}
//         {images.length > 1 && (
//           <div className="border-t border-gray-100 bg-gray-50 px-6 py-6">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">
//               More Photos
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {images.slice(1).map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`property-${index}`}
//                   className="w-full h-40 object-cover rounded-lg shadow-sm hover:scale-105 transition"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// export default function PropertyDetails() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/properties/${id}`
//         );
//         setProperty(res.data);
//       } catch (error) {
//         console.error('Error fetching property:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   if (loading)
//     return <p className="text-center mt-10">Loading property details...</p>;
//   if (!property)
//     return <p className="text-center mt-10">Property not found.</p>;

//   const images = Array.isArray(property.images)
//     ? property.images
//     : JSON.parse(property.images || '[]');

//   const handlePrev = () =>
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   const handleNext = () =>
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

//   return (
//     <section className="min-h-screen bg-gray-50 pt-20 pb-12 px-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
//         {/* Image Gallery */}
//         <div className="relative">
//           {images.length > 0 ? (
//             <>
//               <motion.img
//                 key={currentIndex}
//                 src={images[currentIndex]}
//                 alt={property.title}
//                 className="w-full h-96 object-cover cursor-pointer"
//                 onClick={() => setLightboxOpen(true)}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//               />

//               {/* Arrows */}
//               {images.length > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrev}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
//                     <ChevronLeft size={22} />
//                   </button>
//                   <button
//                     onClick={handleNext}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
//                     <ChevronRight size={22} />
//                   </button>
//                 </>
//               )}
//             </>
//           ) : (
//             <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
//               No Image Available
//             </div>
//           )}

//           <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
//             {property.type === 'rent' ? 'For Rent' : 'For Sale'}
//           </div>
//         </div>

//         {/* Thumbnails */}
//         {images.length > 1 && (
//           <div className="flex flex-wrap justify-center gap-3 mt-4 px-6">
//             {images.map((img, index) => (
//               <motion.img
//                 key={index}
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
//                   currentIndex === index
//                     ? 'border-teal-600 scale-105'
//                     : 'border-transparent'
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Property Info */}
//         <div className="p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             {property.title}
//           </h2>
//           <p className="text-gray-500 text-lg mb-3">{property.location}</p>
//           <p className="text-2xl font-semibold text-teal-700 mb-6">
//             ₦{property.price.toLocaleString()}
//           </p>

//           <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
//             <span>🛏️ {property.bedrooms || 0} Bedrooms</span>
//             <span>🛁 {property.bathrooms || 0} Bathrooms</span>
//           </div>

//           <p className="text-gray-700 leading-relaxed mb-10">
//             {property.description || 'No description provided.'}
//           </p>

//           <div className="flex items-center justify-between">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => alert('Contact feature coming soon!')}
//               className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition">
//               📞 Contact Landlord
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => window.history.back()}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
//               ← Go Back
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen Lightbox */}
//       <AnimatePresence>
//         {lightboxOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}>
//             {/* Image */}
//             <motion.img
//               key={currentIndex}
//               src={images[currentIndex]}
//               alt="Fullscreen"
//               className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//             />

//             {/* Controls */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={handlePrev}
//                   className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
//                   <ChevronLeft size={26} color="white" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
//                   <ChevronRight size={26} color="white" />
//                 </button>
//               </>
//             )}

//             {/* Close */}
//             <button
//               onClick={() => setLightboxOpen(false)}
//               className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 rounded-full p-2">
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setProperty(res.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading property details...</p>;
  if (!property)
    return <p className="text-center mt-10">Property not found.</p>;

  const images = Array.isArray(property.images)
    ? property.images
    : JSON.parse(property.images || '[]');

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="min-h-screen bg-gray-50 pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          {images.length > 0 ? (
            <>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={property.title}
                className="w-full h-96 object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}

          <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
            {property.type === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4 px-6">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  currentIndex === index
                    ? 'border-teal-600 scale-105'
                    : 'border-transparent'
                }`}
              />
            ))}
          </div>
        )}

        {/* Property Info */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {property.title}
          </h2>
          <p className="text-gray-500 text-lg mb-3">{property.location}</p>
          <p className="text-2xl font-semibold text-teal-700 mb-6">
            ₦{property.price.toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <span>🛏️ {property.bedrooms || 0} Bedrooms</span>
            <span>🛁 {property.bathrooms || 0} Bathrooms</span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-10">
            {property.description || 'No description provided.'}
          </p>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => alert('Contact feature coming soon!')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition">
              📞 Contact Landlord
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ← Go Back
            </motion.button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* Draggable Image (for swipe) */}
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) handleNext();
                else if (info.offset.x > 100) handlePrev();
              }}
            />

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
                  <ChevronLeft size={26} color="white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
                  <ChevronRight size={26} color="white" />
                </button>
              </>
            )}

            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 rounded-full p-2">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
