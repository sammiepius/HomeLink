import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'TENANT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.role) {
      setError('Please select your role.');
      return;
    }
    // TODO: hook into backend later
    try {
      const res = await API.post('auth/signup', form);
      alert('Signup successful! Please log in.');
      navigate('/login');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Signup failed!');
    } finally {
      setLoading(false);
    }
    console.log('Signup submitted:', form);
  };

  return (
    <section className="min-h-screen flex pt-20">
      {/* Left side (branding) */}
      <div className="hidden md:flex flex-1 bg-teal-600 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Welcome to HomeLink</h1>
          <p className="text-lg text-teal-100">
            Find your dream home, connect with landlords, and explore listings
            all in one place.
          </p>
        </div>
      </div>

      {/* Right side (form) */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className=" grid gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 space-y-4"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {/* Role selection */}
            <div>
              <p className="text-gray-700 font-medium mb-2">I am a:</p>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="TENANT"
                    checked={form.role === 'TENANT'}
                    onChange={handleChange}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>User (Looking for a home)</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="LANDLORD"
                    checked={form.role === 'LANDLORD'}
                    onChange={handleChange}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>Landlord (Posting apartments)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
              Sign Up
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Already have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/login')}
              className="text-teal-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
