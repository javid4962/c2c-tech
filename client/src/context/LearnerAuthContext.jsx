import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import learnerHttp from "../api/learnerHttp";

const LearnerAuthContext = createContext(null);

export const LearnerAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const token = localStorage.getItem("c2c_user_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await learnerHttp.get("/users/me");
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("c2c_user_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async (credentials) => {
    const { data } = await learnerHttp.post("/users/login", credentials);
    localStorage.setItem("c2c_user_token", data.token);
    setUser(data.user);
    toast.success("Signed in successfully.");
    return data;
  };

  const register = async (payload) => {
    const { data } = await learnerHttp.post("/users/register", payload);
    localStorage.setItem("c2c_user_token", data.token);
    setUser(data.user);
    toast.success("Account created.");
    return data;
  };

  const requestPhoneOtp = async (payload) => {
    const { data } = await learnerHttp.post("/users/otp/request", payload);
    toast.success(data.data?.devOtp ? `OTP sent. Dev code: ${data.data.devOtp}` : "OTP sent successfully.");
    return data;
  };

  const verifyPhoneOtp = async (payload) => {
    const { data } = await learnerHttp.post("/users/otp/verify", payload);
    localStorage.setItem("c2c_user_token", data.token);
    setUser(data.user);
    toast.success("Phone verified. Signed in successfully.");
    return data;
  };

  const logout = () => {
    localStorage.removeItem("c2c_user_token");
    setUser(null);
    toast.success("Signed out.");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      requestPhoneOtp,
      verifyPhoneOtp,
      logout,
      refreshProfile: loadProfile,
    }),
    [user, loading]
  );

  return <LearnerAuthContext.Provider value={value}>{children}</LearnerAuthContext.Provider>;
};

export const useLearnerAuth = () => {
  const context = useContext(LearnerAuthContext);
  if (!context) throw new Error("useLearnerAuth must be used within LearnerAuthProvider.");
  return context;
};
