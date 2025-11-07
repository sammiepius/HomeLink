// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p>Loading...</p>;

//   // If no user, redirect to login
//   if (!user) return <Navigate to="/login" replace />;

//   // If user doesn't have permission
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Checking access...
      </div>
    );
  }

  // No user? Kick out to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed? Go to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
