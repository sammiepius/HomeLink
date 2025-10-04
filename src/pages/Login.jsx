import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    // TODO: Replace this with backend authentication
    // Example hardcoded login for now:
    let mockUser = {
      email: form.email,
      role: form.email.includes("landlord") ? "landlord" : "user", 
    };

    // Redirect based on role
    if (mockUser.role === "landlord") {
      navigate("/landlord");
    } else {
      navigate("/profile");
    }
  };

  return (
    <section className="min-h-screen flex">
      {/* Left side (branding) */}
      <div className="hidden md:flex flex-1 bg-teal-600 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg text-teal-100">
            Log in to continue exploring listings, managing your profile, and
            connecting with landlords directly.
          </p>
        </div>
      </div>

      {/* Right side (form) */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
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

            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
              Login
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Don’t have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/signup')}
              className="text-teal-600 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.email || !form.password) {
//       setError("Email and password are required.");
//       return;
//     }

//     // TODO: Replace this with backend authentication
//     // Example hardcoded login for now:
//     let mockUser = {
//       email: form.email,
//       role: form.email.includes("landlord") ? "landlord" : "user", 
//     };

//     // Redirect based on role
//     if (mockUser.role === "landlord") {
//       navigate("/landlord-profile");
//     } else {
//       navigate("/profile");
//     }
//   };

//   return (
//     <section className="min-h-screen flex">
//       {/* Left side branding */}
//       <div className="hidden md:flex flex-1 bg-teal-600 text-white items-center justify-center p-12">
//         <div className="max-w-md">
//           <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
//           <p className="text-lg text-teal-100">
//             Login to continue exploring homes or managing your listings.
//           </p>
//         </div>
//       </div>

//       {/* Right side (form) */}
//       <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
//         <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Login
//           </h2>

//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />

//             <button
//               type="submit"
//               className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-gray-600 text-sm mt-6 text-center">
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-teal-600 font-medium hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }