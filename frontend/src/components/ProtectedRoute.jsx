// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me"); // kalau sukses berarti login
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // bisa diganti spinner
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
