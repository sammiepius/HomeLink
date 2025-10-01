export default function Listings() {
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment in City Center',
      price: '$1,200 / month',
      type: 'For Rent',
      image:
        'https://images.unsplash.com/photo-1600607688968-6b4d59f0a1f0?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      price: '$450,000',
      type: 'For Sale',
      image:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Cozy Suburban Home',
      price: '$250,000',
      type: 'For Sale',
      image:
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Stylish Loft Apartment',
      price: '$900 / month',
      type: 'For Rent',
      image:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="listings" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Featured <span className="text-teal-600">Listings</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="inline-block text-sm font-medium text-teal-600 mb-2">
                  {property.type}
                </span>
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-700 font-medium">{property.price}</p>
                <button className="mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
