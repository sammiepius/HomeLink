import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2, X } from 'lucide-react';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
  });

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    imageUrl: null,
  });

  // ✅ Fetch existing property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setForm({
          title: res.data.title || '',
          description: res.data.description || '',
          price: res.data.price || '',
          location: res.data.location || '',
          type: res.data.type || '',
          bedrooms: res.data.bedrooms || '',
          bathrooms: res.data.bathrooms || '',
        });

        setImages(res.data.images || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, token]);

  // ✅ Handle field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle new image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  // ✅ Open confirmation modal
  const openDeleteConfirm = (imageUrl) => {
    setConfirmDelete({ open: true, imageUrl });
  };

  // ✅ Cancel modal
  const closeConfirm = () => {
    setConfirmDelete({ open: false, imageUrl: null });
  };

  // ✅ Confirm delete existing image
  const confirmDeleteImage = async () => {
    const imageUrl = confirmDelete.imageUrl;
    if (!imageUrl) return;
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}/image`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { imageUrl },
      });
      setImages((prev) => prev.filter((img) => img !== imageUrl));
      toast.success('Image deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete image');
    } finally {
      closeConfirm();
    }
  };

  // ✅ Submit updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('location', form.location);
    formData.append('type', form.type);
    formData.append('bedrooms', form.bedrooms);
    formData.append('bathrooms', form.bathrooms);

    newImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await axios.put(
        `http://localhost:5000/api/properties/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('✅ Property updated successfully!');
      navigate('/landlord');
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error('Failed to update property');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading property...
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 pt-20">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🏡 Edit Property
          </h2>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            type="number"
            min="1"
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            type="number"
            min="1"
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              <span>For Rent</span>
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
            className="w-full p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* ✅ Existing Images */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Current Images:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => openDeleteConfirm(img)}
                    className="absolute top-2 right-2 hover:bg-red-700 bg-opacity-90 hover:bg-opacity-100 
                      text-white p-1.5 rounded-full shadow-lg transition-transform 
                      transform hover:scale-110">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ New Images Upload */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Upload New Images:</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg px-4 cursor-pointer py-2 w-full bg-gray-50"
            />
          </div>

          {/* ✅ New Images Preview */}
          {newImages.length > 0 && (
            <div>
              <p className="text-gray-700 font-medium mb-2">
                New Images Preview:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {newImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* ✅ Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg disabled:opacity-50">
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* 🔴 Delete Confirmation Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl w-80 p-6 relative animate-fadeIn">
            <button
              onClick={closeConfirm}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Image?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 text-sm">
                Cancel
              </button>
              <button
                onClick={confirmDeleteImage}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
