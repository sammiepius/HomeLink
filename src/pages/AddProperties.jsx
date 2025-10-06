import { useState } from 'react';

export default function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    house_for: 'rent',
    images: [],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setForm({ ...form, images: previewUrls });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.location || !form.price || !form.description) {
      setError('Please fill in all required fields.');
      return;
    }

    // TODO: Save to backend later
    console.log('Property added:', form);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🏡 Add New Property
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Property Title (e.g. 2-Bedroom Apartment)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (e.g. Lagos, Nigeria)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (₦)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="bedrooms"
              min="1"
              max="5"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              name="bathrooms"
              min="1"
              max="5"
              value={form.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            {/* <p className="text-gray-700 font-medium mb-2">I am a:</p> */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="house_for"
                  value="rent"
                  checked={form.house_for === 'rent'}
                  onChange={handleChange}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span>For Rents</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="house_for"
                  value="sale"
                  checked={form.house_for === 'sale'}
                  onChange={handleChange}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span>For Sale</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Property Description"
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>

          {/* Image Upload */}
          <div>
            {/* <label className="block font-medium mb-1">Property Images</label> */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border rounded-lg focus:outline-none cursor-pointer focus:ring-2 focus:ring-teal-500"
            />

            {/* Preview Images */}
            {form.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {form.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
            Add Property
          </button>
        </form>
      </div>
    </section>
  );
}
