import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { prettyJson, safeJsonParse } from "../../utils/formatters";
import ImageUploadField from "../common/ImageUploadField";

const statsToLines = (stats = []) =>
  stats.map((item) => `${item.label}|${item.href ?? item.value ?? ""}`).join("\n");

const linesToStats = (value = "") =>
  value
    .split("\n")
    .map((line) => line.split("|"))
    .filter((parts) => parts[0] && parts[1])
    .map(([label, metric]) => ({ label: label.trim(), value: metric.trim() }));

const createFormState = (settings) => ({
  companyName: settings?.companyName || "",
  logoUrl: settings?.logoUrl || "",
  email: settings?.contact?.email || "",
  phone: settings?.contact?.phone || "",
  address: settings?.contact?.address || "",
  mapEmbedUrl: settings?.contact?.mapEmbedUrl || "",
  eyebrow: settings?.hero?.eyebrow || "",
  heroVideoUrl: settings?.hero?.videoUrl || "",
  headline: settings?.hero?.headline || "",
  rotatingWords: (settings?.hero?.rotatingWords || []).join("\n"),
  subtext: settings?.hero?.subtext || "",
  primaryCtaLabel: settings?.hero?.primaryCtaLabel || "",
  primaryCtaHref: settings?.hero?.primaryCtaHref || "",
  secondaryCtaLabel: settings?.hero?.secondaryCtaLabel || "",
  secondaryCtaHref: settings?.hero?.secondaryCtaHref || "",
  heroStats: statsToLines(settings?.hero?.stats || []),
  overview: settings?.about?.overview || "",
  mission: settings?.about?.mission || "",
  vision: settings?.about?.vision || "",
  leadershipTeam: prettyJson(settings?.leadershipTeam),
  testimonials: prettyJson(settings?.testimonials),
  industries: prettyJson(settings?.industries),
  proofPoints: prettyJson(settings?.proofPoints),
  expertiseCards: prettyJson(settings?.expertiseCards),
  roadmap: prettyJson(settings?.roadmap),
  partners: prettyJson(settings?.partners),
  promoBanner: prettyJson(settings?.promoBanner || {}),
  discoveryBanner: prettyJson(settings?.discoveryBanner || {}),
  footer: prettyJson(settings?.footer || {}),
  socialLinks: prettyJson(settings?.socialLinks),
});

const SettingsForm = ({ settings, onSave, saving }) => {
  const [formState, setFormState] = useState(createFormState(settings));

  useEffect(() => {
    setFormState(createFormState(settings));
  }, [settings]);

  const handleChange = (name, value) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      companyName: formState.companyName,
      logoUrl: formState.logoUrl,
      contact: {
        email: formState.email,
        phone: formState.phone,
        address: formState.address,
        mapEmbedUrl: formState.mapEmbedUrl,
      },
      hero: {
        eyebrow: formState.eyebrow,
        videoUrl: formState.heroVideoUrl,
        headline: formState.headline,
        rotatingWords: formState.rotatingWords
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        subtext: formState.subtext,
        primaryCtaLabel: formState.primaryCtaLabel,
        primaryCtaHref: formState.primaryCtaHref,
        secondaryCtaLabel: formState.secondaryCtaLabel,
        secondaryCtaHref: formState.secondaryCtaHref,
        stats: linesToStats(formState.heroStats).map((item) => ({ label: item.label, href: item.value })),
      },
      about: {
        overview: formState.overview,
        mission: formState.mission,
        vision: formState.vision,
      },
      leadershipTeam: safeJsonParse(formState.leadershipTeam, []),
      testimonials: safeJsonParse(formState.testimonials, []),
      industries: safeJsonParse(formState.industries, []),
      proofPoints: safeJsonParse(formState.proofPoints, []),
      expertiseCards: safeJsonParse(formState.expertiseCards, []),
      roadmap: safeJsonParse(formState.roadmap, []),
      partners: safeJsonParse(formState.partners, []),
      promoBanner: safeJsonParse(formState.promoBanner, {}),
      discoveryBanner: safeJsonParse(formState.discoveryBanner, {}),
      footer: safeJsonParse(formState.footer, {}),
      socialLinks: safeJsonParse(formState.socialLinks, []),
    };

    try {
      await onSave(payload);
      toast.success("Settings updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update settings.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Brand Settings</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Company Name</label>
            <input
              type="text"
              className="w-full rounded-2xl border-slate-200 bg-white"
              value={formState.companyName}
              onChange={(event) => handleChange("companyName", event.target.value)}
              required
            />
          </div>
          <ImageUploadField label="Logo" value={formState.logoUrl} onChange={(value) => handleChange("logoUrl", value)} />
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Contact Details</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Email</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.email} onChange={(event) => handleChange("email", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Phone</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.phone} onChange={(event) => handleChange("phone", event.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-midnight">Address</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.address} onChange={(event) => handleChange("address", event.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-midnight">Google Maps Embed URL</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.mapEmbedUrl} onChange={(event) => handleChange("mapEmbedUrl", event.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Homepage Hero</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Eyebrow</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.eyebrow} onChange={(event) => handleChange("eyebrow", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Hero Background Video URL (mp4)</label>
            <input
              className="w-full rounded-2xl border-slate-200 bg-white"
              value={formState.heroVideoUrl}
              onChange={(event) => handleChange("heroVideoUrl", event.target.value)}
              placeholder="https://cdn.example.com/video.mp4"
            />
            <p className="mt-2 text-xs text-slate-500">Optional. Use a direct mp4 URL for autoplay background video.</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Headline</label>
            <textarea
              rows="3"
              className="w-full rounded-2xl border-slate-200 bg-white"
              value={formState.headline}
              onChange={(event) => handleChange("headline", event.target.value)}
            />
            <p className="mt-2 text-xs text-slate-500">Use line breaks if you want the headline to split across multiple lines.</p>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-midnight">Subtext</label>
            <textarea rows="4" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.subtext} onChange={(event) => handleChange("subtext", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Rotating Words</label>
            <textarea rows="5" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.rotatingWords} onChange={(event) => handleChange("rotatingWords", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Hero Stats</label>
            <textarea rows="5" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.heroStats} onChange={(event) => handleChange("heroStats", event.target.value)} />
            <p className="mt-2 text-xs text-slate-500">Use one line per stat in the format Label|Value.</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Primary CTA Label</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.primaryCtaLabel} onChange={(event) => handleChange("primaryCtaLabel", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Primary CTA Href</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.primaryCtaHref} onChange={(event) => handleChange("primaryCtaHref", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Secondary CTA Label</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.secondaryCtaLabel} onChange={(event) => handleChange("secondaryCtaLabel", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Secondary CTA Href</label>
            <input className="w-full rounded-2xl border-slate-200 bg-white" value={formState.secondaryCtaHref} onChange={(event) => handleChange("secondaryCtaHref", event.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">About Content</p>
        <div className="mt-6 grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Overview</label>
            <textarea rows="4" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.overview} onChange={(event) => handleChange("overview", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Mission</label>
            <textarea rows="4" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.mission} onChange={(event) => handleChange("mission", event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-midnight">Vision</label>
            <textarea rows="4" className="w-full rounded-2xl border-slate-200 bg-white" value={formState.vision} onChange={(event) => handleChange("vision", event.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Structured JSON Content</p>
        <div className="mt-6 grid gap-5">
          {[
            ["leadershipTeam", "Leadership Team"],
            ["testimonials", "Testimonials"],
            ["industries", "Industries"],
            ["proofPoints", "Proof Points"],
            ["expertiseCards", "Expertise Cards"],
            ["roadmap", "Transformation Roadmap"],
            ["partners", "Partnerships"],
            ["promoBanner", "Promo Banner"],
            ["discoveryBanner", "Discovery Banner"],
            ["footer", "Footer Content"],
            ["socialLinks", "Social Links"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-semibold text-midnight">{label}</label>
              <textarea
                rows="8"
                className="w-full rounded-2xl border-slate-200 bg-white font-mono text-sm"
                value={formState[key]}
                onChange={(event) => handleChange(key, event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-midnight px-6 py-3 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
