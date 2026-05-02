import { createContext, useContext, useEffect, useMemo, useState } from "react";
import http from "../api/http";

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data } = await http.get("/settings");
      setSettings(data.data);
    } catch (error) {
      console.error("Unable to load site settings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value = useMemo(
    () => ({
      settings,
      loading,
      reloadSettings: fetchSettings,
    }),
    [settings, loading]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSite must be used within SiteProvider.");
  }

  return context;
};

