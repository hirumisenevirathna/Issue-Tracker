import { createContext, useEffect, useState } from "react";
import { me } from "../api/auth.api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");

    // ✅ token නැත්තං: immediately stop loading + user null
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await me(); // must send token in Authorization header
      setUser(res.data.user);
    } catch (err) {
      // ✅ token invalid/expired => remove it
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
