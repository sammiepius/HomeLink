// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { User, Lock, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Settings({ role = "Tenant" }) {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [avatar, setAvatar] = useState(null);
//   const navigate = useNavigate();

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatar(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 relative">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-5 left-5 flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-all text-sm"
//         >
//           <ArrowLeft size={16} /> Back to Profile
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-2 mt-4">
//           {role} Account Settings
//         </h2>
//         <p className="text-center text-gray-500 mb-6 text-sm">
//           Manage your profile, security, and preferences.
//         </p>

//         {/* Tabs */}
//         <div className="flex justify-center mb-6 space-x-4">
//           <button
//             onClick={() => setActiveTab("profile")}
//             className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
//               activeTab === "profile"
//                 ? "bg-teal-600 text-white shadow-md"
//                 : "bg-gray-100 text-gray-700 hover:bg-teal-50"
//             }`}
//           >
//             <User size={16} /> Profile Info
//           </button>
//           <button
//             onClick={() => setActiveTab("security")}
//             className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
//               activeTab === "security"
//                 ? "bg-teal-600 text-white shadow-md"
//                 : "bg-gray-100 text-gray-700 hover:bg-teal-50"
//             }`}
//           >
//             <Lock size={16} /> Security
//           </button>
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {activeTab === "profile" ? (
//             <ProfileInfoTab
//               avatar={avatar}
//               handleAvatarChange={handleAvatarChange}
//               role={role}
//             />
//           ) : (
//             <SecurityTab />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// /* ------------------- Profile Info Tab ------------------- */
// const ProfileInfoTab = ({ avatar, handleAvatarChange, role }) => {
//   return (
//     <form className="space-y-6 text-gray-700">
//       {/* Avatar */}
//       <div className="flex flex-col items-center space-y-2">
//         <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
//           {avatar ? (
//             <img src={avatar} alt="avatar preview" className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
//               Avatar
//             </div>
//           )}
//         </div>
//         <label className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-1.5 rounded-lg cursor-pointer transition-all">
//           Change Avatar
//           <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
//         </label>
//       </div>

//       {/* Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="First name"
//           className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//         />
//         <input
//           type="text"
//           placeholder="Last name"
//           className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//         />
//       </div>

//       <input
//         type="email"
//         placeholder="Email address"
//         className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//       />

//       <input
//         type="text"
//         placeholder="Phone number"
//         className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//       />

//       {/* Role-Specific Field */}
//       {role === "Landlord" && (
//         <input
//           type="text"
//           placeholder="Business name (optional)"
//           className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//         />
//       )}

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-teal-600 hover:bg-teal-700 transition-all text-white font-medium px-6 py-2 rounded-lg"
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>
//   );
// };

// /* ------------------- Security Tab ------------------- */
// const SecurityTab = () => {
//   return (
//     <form className="space-y-5 text-gray-700 grid gap-4">
//       <input
//         type="password"
//         placeholder="Current password"
//         className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//       />
//       <input
//         type="password"
//         placeholder="New password"
//         className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//       />
//       <input
//         type="password"
//         placeholder="Confirm new password"
//         className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
//       />
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-teal-600 hover:bg-teal-700 transition-all text-white font-medium px-6 py-2 rounded-lg"
//         >
//           Update Password
//         </button>
//       </div>
//     </form>
//   );
// };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings({ role = 'Tenant' }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
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
            />
          ) : (
            <SecurityTab />
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------- Profile Info Tab ------------------- */
const ProfileInfoTab = ({ avatar, handleAvatarChange, role }) => {
  return (
    <form className="space-y-5 text-gray-700">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
          {avatar ? (
            <img
              src={avatar}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First name"
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Last name"
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />
      </div>
      <div className="grid gap-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
        />

        <input
          type="text"
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
