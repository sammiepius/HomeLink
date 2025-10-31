import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
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

//   useEffect(() => {
//     // Fetch existing listing
//     axios
//       .get(`http://localhost:5000/api/listings/${id}`, {
//         headers: { Authorization: ` Bearer ${token}` },
//       })
//       .then((res) => setForm(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)

    // const data = new FormData();
    // for (let key in form) {
    //   if (key !== 'images') data.append(key, form[key]);
    // }

    // for (let i = 0; i < form.images.length; i++) {
    //   data.append('images', form.images[i]);
    // }

    // try {
    //   await axios.put('http://localhost:5000/api/listings/${id}', data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   alert('Property updated successfully!');
    //   navigate('/profile'); // back to landlord profile
    // } catch (err) {
    //   console.error(err);
    //   alert('Failed to update property');
    // }
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {/* <label>choose</label> */}
          {/* <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select> */}

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

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
