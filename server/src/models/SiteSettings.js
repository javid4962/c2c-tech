import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    label: String,
    href: String,
  },
  { _id: false }
);

const leadershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
  },
  { _id: false }
);

const industrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const metricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const contentCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Sparkles" },
  },
  { _id: false }
);

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "" },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const bannerSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    statValue: { type: String, default: "" },
    statLabel: { type: String, default: "" },
    ctaLabel: { type: String, default: "" },
    ctaHref: { type: String, default: "" },
  },
  { _id: false }
);

const footerSchema = new mongoose.Schema(
  {
    tagline: { type: String, default: "" },
    quickLinks: [linkSchema],
    serviceLinks: [linkSchema],
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    logoUrl: { type: String, default: "" },
    contact: {
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      mapEmbedUrl: { type: String, default: "" },
    },
    hero: {
      eyebrow: { type: String, default: "Enterprise IT Partner" },
      videoUrl: { type: String, default: "" },
      headline: { type: String, required: true },
      rotatingWords: [{ type: String }],
      subtext: { type: String, required: true },
      primaryCtaLabel: { type: String, default: "Schedule a Strategy Call" },
      primaryCtaHref: { type: String, default: "/contact" },
      secondaryCtaLabel: { type: String, default: "Explore Services" },
      secondaryCtaHref: { type: String, default: "/services" },
      stats: [linkSchema],
    },
    about: {
      overview: { type: String, required: true },
      mission: { type: String, required: true },
      vision: { type: String, required: true },
    },
    leadershipTeam: [leadershipSchema],
    testimonials: [testimonialSchema],
    industries: [industrySchema],
    proofPoints: [metricSchema],
    expertiseCards: [contentCardSchema],
    roadmap: [contentCardSchema],
    partners: [partnerSchema],
    promoBanner: bannerSchema,
    discoveryBanner: bannerSchema,
    footer: footerSchema,
    socialLinks: [linkSchema],
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
