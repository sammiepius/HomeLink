import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function EditListing() {
  const { id } = useParams();
  console.log('property id:', id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    images: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch existing property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setForm(res.data);
        if (res.data.images) {
          setPreviewImages(res.data.images);
        }
      } catch (error) {
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle new image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...form.images, ...previews]);
  };

  // Submit update
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', property.title);
    formData.append('description', property.description);
    formData.append('price', property.price);
    formData.append('location', property.location);
    formData.append('type', property.type);
    formData.append('bedrooms', property.bedrooms);
    formData.append('bathrooms', property.bathrooms);

    // append only if new images are uploaded
    newImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await axios.put(` http://localhost:5000/api/properties/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Property updated successfully!');
      navigate('/profile'); // redirect back to landlord profile
    } catch (error) {
      console.error('❌ Update error:', error);
      alert('Failed to update property');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 pt-20">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit} className=" grid gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🏡 Edit Property
          </h2>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            min="1"
            max="5"
            type="number"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Bathrooms"
            type="number"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="rent"
                checked={form.type === 'rent'}
                onChange={handleChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span>For Rents</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="sale"
                checked={form.type === 'sale'}
                onChange={handleChange}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span>For Sale</span>
            </label>
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {/* <label>choose</label> */}
          {/* <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Current Images
            </label>
            <div className="flex flex-wrap gap-3">
              {form.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover border"
                />
              ))}
            </div>
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Property Images
            </label>
            <div className="flex flex-wrap gap-3 ">
              {previewImages?.length > 0 &&
                previewImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg px-4 cursor-pointer py-2 w-full bg-gray-50"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Upload New Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border rounded-lg px-4 py-2 w-full bg-gray-50"
            />
          </div> */}

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
