import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Settings({ role = 'Landlord' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    profilePhoto: '',
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          profilePhoto: null,
        });
        if (data.profilePhoto) setAvatar(data.profilePhoto);
      } catch (err) {
        console.error('Fail to load user data', err);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profilePhoto: file });
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    if (form.profilePhoto) {
      formData.append('profilePhoto', form.profilePhoto);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile updated successfully!');
      navigate('/landlord');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-all text-sm">
          <ArrowLeft size={16} /> Back to Profile
        </button>

        {/* Header */}
        {/* <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-2 mt-4">
          {role} Account Settings
        </h2> */}
        <p className="text-center text-gray-500 mb-6 text-sm">
          Manage your profile, security, and preferences.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-3 md:space-x-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-teal-50'
            }`}>
            <User size={16} /> Profile Info
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'security'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-teal-50'
            }`}>
            <Lock size={16} /> Security
          </button>
        </div>

        {/* Animated Tab Content */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            {activeTab === 'profile' ? (
              <ProfileInfoTab
                avatar={avatar}
                handleAvatarChange={handleAvatarChange}
                role={role}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <SecurityTab />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
/* ------------------- Skeleton Loader ------------------- */
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-5">
    <div className="flex flex-col items-center space-y-2">
      <div className="w-24 h-24 rounded-full bg-gray-200" />
      <div className="w-24 h-6 bg-gray-200 rounded" />
    </div>
    <div className="space-y-3">
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
    <div className="flex justify-end">
      <div className="w-24 h-10 bg-gray-200 rounded" />
    </div>
  </div>
);
/* ------------------- Profile Info Tab ------------------- */
const ProfileInfoTab = ({
  avatar,
  handleAvatarChange,
  role,
  handleSubmit,
  handleChange,
  form,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
          {avatar ? (
            <img
              src={avatar || '/default-avatar.png'}
              alt="avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              Avatar
            </div>
          )}
        </div>
        <label className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-1.5 rounded-lg cursor-pointer transition-all">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </label>
      </div>

      {/* Inputs */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <div className="grid gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="change name"
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />
        {/* <input
          type="text"
          placeholder="Last name"
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />
      </div> */}

        <input
          type="email"
          name="email"
          value={form.email}
          // onChange={handleChange}
          readOnly
          placeholder="Email address"
          className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full text-gray-400"
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />

        {/* Optional landlord field
        {role === 'Landlord' && (
          <input
            type="text"
            placeholder="Business name (optional)"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
          />
        )} */}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 transition-all text-white font-medium px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

/* ------------------- Security Tab ------------------- */
const SecurityTab = () => {
  return (
    <form className="space-y-5 text-gray-700 grid gap-4">
      <input
        type="password"
        placeholder="Current password"
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
      />
      <input
        type="password"
        placeholder="New password"
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 transition-all text-white font-medium px-6 py-2 rounded-lg">
          Update Password
        </button>
      </div>
    </form>
  );
};
