import { useEffect, useState } from 'react';
import { Edit, Eye, PlusCircle, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [myProperties, setMyProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const itemData = res.data;
        setData(itemData);
        if (itemData.profilePhoto) setAvatar(itemData.profilePhoto);
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    const fetchMyProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');
        const res = await axios.get(
          'http://localhost:5000/api/properties/my-property',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMyProperties(res.data);
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchMyProperty();
  }, []);

  const handleNextImage = () => {
    if (!selectedProperty?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedProperty?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading.....</p>;

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {avatar ? (
            <img
              src={avatar || '/default-avatar.png'}
              alt="avatar preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center text-sm text-gray-400 bg-gray-100 rounded-full">
              Avatar
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
            <p className="text-gray-600 mt-1">{data.email}</p>
            <p className="text-gray-600 mt-1">{data.phone}</p>
          </div>
          <div
            onClick={() => navigate('/landlordsettings')}
            className="flex px-5 py-3 text-gray-700 hover:text-teal-600 cursor-pointer">
            <Settings size={16} className="mr-2" />
          </div>
        </div>

        {/* Property List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              My Posted Apartments
            </h3>
            <button
              onClick={() => navigate('/addproperties')}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <PlusCircle size={18} />
              Add Listing
            </button>
          </div>
          <hr />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={
                    property.images?.[0] ||
                    'https://placehold.co/600x400?text=No+Image'
                  }
                  alt={property.title}
                  className="h-48 w-full object-cover bg-gray-100"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {property.location}
                  </p>
                  <p className="text-teal-600 font-bold mt-2">
                    ₦{Number(property.price).toLocaleString()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setCurrentImageIndex(0);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-gray-700 text-sm">
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/editproperties/${property.id}`)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2 text-sm">
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

      {/* Modal with Image Controls */}
      <AnimatePresence>
        {showModal && selectedProperty && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-end md:items-center z-50 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              key="modal-content"
              className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-t-3xl md:rounded-2xl shadow-2xl p-6 w-full md:w-[90%] max-w-lg relative overflow-hidden"
              initial={
                isMobile
                  ? { y: '100%', opacity: 0 }
                  : { scale: 0.8, opacity: 0, y: 30 }
              }
              animate={
                isMobile
                  ? { y: 0, opacity: 1 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              exit={
                isMobile
                  ? { y: '100%', opacity: 0 }
                  : { scale: 0.9, opacity: 0, y: 20 }
              }
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10">
                <X size={20} />
              </button>

              {/* Image Carousel */}
              <div className="relative mb-3">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={
                      selectedProperty.images?.[currentImageIndex] ||
                      'https://placehold.co/600x400?text=No+Image'
                    }
                    alt={selectedProperty.title}
                    className="rounded-xl w-full h-56 object-cover"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {selectedProperty.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Property Info */}
              <h2 className="text-xl font-semibold mb-2">
                {selectedProperty.title}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {selectedProperty.location}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ₦
                {Number(selectedProperty.price).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong>{' '}
                {selectedProperty.description || 'No description provided.'}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {selectedProperty.type || 'N/A'}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
