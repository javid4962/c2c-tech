import { useState } from "react";
import http from "../../api/http";
import SettingsForm from "../../components/admin/SettingsForm";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";

const AdminSettingsPage = () => {
  const { settings, reloadSettings } = useSite();
  const [saving, setSaving] = useState(false);

  const handleSave = async (payload) => {
    try {
      setSaving(true);
      await http.put("/settings", payload);
      await reloadSettings();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title={`Site Settings | ${settings?.companyName} Admin`} description="Manage site-wide company information." />
      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Settings</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-midnight">Site-wide brand and content settings</h1>
      </div>
      <SettingsForm settings={settings} onSave={handleSave} saving={saving} />
    </>
  );
};

export default AdminSettingsPage;

