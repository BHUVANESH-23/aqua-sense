import { Navigate, Outlet } from "react-router-dom";

// ✅ Higher-order component for protected routes
export default function ProtectedRoute() {
  const token = localStorage.getItem("token"); // 🔐 Check token

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
