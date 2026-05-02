import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import http from "../api/http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const token = localStorage.getItem("c2c_admin_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await http.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("c2c_admin_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async (credentials) => {
    const { data } = await http.post("/auth/login", credentials);
    localStorage.setItem("c2c_admin_token", data.token);
    setUser(data.user);
    toast.success("Welcome back.");
    return data;
  };

  const logout = () => {
    localStorage.removeItem("c2c_admin_token");
    setUser(null);
    toast.success("You have been signed out.");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshProfile: loadProfile,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
};

