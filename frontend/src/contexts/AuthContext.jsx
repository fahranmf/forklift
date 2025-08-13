import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../services/api"; // pastiin path ini bener

// kasih default supaya gak crash walau provider belum kebaca
const AuthContext = createContext({ me: null, loading: false, error: null, refresh: () => {} });

export function AuthProvider({ children }) {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMe() {
    console.log("[Auth] fetch /auth/me");
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/auth/me"); 
      console.log("[Auth] me =", data);
      setMe(data);
    } catch (e) {
      console.warn("[Auth] /auth/me error:", e?.response?.status, e?.message);
      setMe(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("[Auth] Provider mounted");
    fetchMe();
  }, []);

  const value = useMemo(() => ({ me, loading, error, refresh: fetchMe }), [me, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext); 
}
