import axios from "axios";
import { useEffect, useState } from "react";
import { FaBed, FaBath, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Listings() {
  const [properties, setProperties] = useState([]);
  const [currentImg, setCurrentImg] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 6; // adjust for your design

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const paginated = properties.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const nextImg = (id, total) => {
    setCurrentImg((prev) => ({
      ...prev,
      [id]: prev[id] + 1 >= total ? 0 : prev[id] + 1,
    }));
  };

  const prevImg = (id, total) => {
    setCurrentImg((prev) => ({
      ...prev,
      [id]: prev[id] - 1 < 0 ? total - 1 : prev[id] - 1,
    }));
  };

  if (loading) return <p className="text-center py-20">Loading properties...</p>;

  return (
    <section id="listings" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Featured <span className="text-teal-600">Listings</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {paginated.map((property) => {
            const images = property.images?.length ? property.images : ["https://placehold.co/600x400?text=No+Image"];
            const current = currentImg[property.id] || 0;

            return (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="max-w-[330px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                {/* IMAGE SECTION */}
                <div className="relative h-56 w-full">

                  {/* IMAGE */}
                  <img
                    src={images[current]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />

                  {/* RIBBON BADGE */}
                  <div className="absolute top-0 left-0">
                    <div className="relative">
                      <span className="bg-red-600 text-white px-5 py-1 text-sm font-semibold ribbon-left">
                        {property.type === "rent" ? "FOR RENT" : "FOR SALE"}
                      </span>
                    </div>
                  </div>

                  {/* NAV BUTTONS (LEFT/RIGHT) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImg(property.id, images.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60"
                      >
                        <FaChevronLeft />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImg(property.id, images.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{property.title}</h3>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-2 text-teal-600" />
                    <span>{property.location || "Unknown location"}</span>
                  </div>

                  <p className="text-xl font-bold text-gray-800 mb-3">
                    ₦{Number(property.price).toLocaleString()}
                  </p>

                  {/* BED / BATH ICONS */}
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <span className="flex items-center">
                      <FaBed className="mr-1 text-teal-600" /> {property.bedrooms || 0} Beds
                    </span>
                    <span className="flex items-center">
                      <FaBath className="mr-1 text-teal-600" /> {property.bathrooms || 0} Baths
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
