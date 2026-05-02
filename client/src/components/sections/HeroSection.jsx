import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const HeroSection = () => {
  const { settings } = useSite();
  const [reducedMotion, setReducedMotion] = useState(false);
  const headline = settings?.hero?.headline || "Vision into Value.\nAccelerated.";
  const headlineLines = headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let firstLine = headlineLines[0] || "Vision into Value.";
  let secondLine = headlineLines[1] || "";

  if (headlineLines.length > 2) {
    firstLine = headlineLines.slice(0, -1).join(" ");
    secondLine = headlineLines.at(-1) || "";
  }

  if (headlineLines.length === 1) {
    const splitIndex = firstLine.lastIndexOf(" ");

    if (splitIndex > 12) {
      secondLine = firstLine.slice(splitIndex + 1);
      firstLine = firstLine.slice(0, splitIndex);
    }
  }

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const update = () => setReducedMotion(Boolean(media.matches));
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const videoUrl = settings?.hero?.videoUrl;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 noise-surface">
      {videoUrl && !reducedMotion ? (
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-40"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/95" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-[-10%] top-10 h-64 w-64 rounded-full bg-[#f1f5ff] blur-3xl" />
          <div className="absolute right-[-8%] top-16 h-72 w-72 rounded-full bg-[#eef2fb] blur-3xl" />
        </div>
      )}

      <div className="page-shell relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500"
            >
              {settings?.hero?.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.04 }}
              className="mt-5 font-display text-[clamp(3rem,5vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-midnight"
            >
              {firstLine}
              {secondLine ? <span className="mt-2 block text-[#2f6cd3]">{secondLine}</span> : null}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-6 max-w-lg text-lg leading-8 text-slate-600"
            >
              {settings?.hero?.subtext}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={settings?.hero?.secondaryCtaHref || "/services"} className="primary-pill">
                {settings?.hero?.secondaryCtaLabel || "Explore Solutions"}
              </Link>
              <Link to={settings?.hero?.primaryCtaHref || "/case-studies"} className="pill-link">
                {settings?.hero?.primaryCtaLabel || "See Our Work"}
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="relative min-h-[360px] lg:min-h-[420px]"
          >
            <div className="hero-dot-wave absolute inset-y-6 right-[-4%] w-[52%] rounded-full opacity-80" />
            <div className="absolute left-[15%] top-1/2 flex h-[300px] w-[300px] -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,#254a82_0%,#173463_42%,#9db7db_64%,#e6eefb_100%)] orb-ring sm:h-[360px] sm:w-[360px]">
              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#2b4f87_0%,#173565_100%)] shadow-[0_24px_60px_rgba(23,53,101,0.25)] sm:h-[174px] sm:w-[174px]">
                <span className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">C2C</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
