import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const DiscoverySection = () => {
  const { settings } = useSite();
  const banner = settings?.discoveryBanner || {};

  return (
    <section className="bg-white py-4">
      <div className="page-shell">
        <div className="rounded-[20px] bg-gradient-to-r from-[#342c8f] via-[#342c8f] to-[#4433a8] px-6 py-7 shadow-panel sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#a7b7ff]">
                {banner.eyebrow || "Discover More"}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white">
                {banner.title || "Discover who we are and why modern enterprises keep us close to the roadmap."}
              </h2>
            </div>
            <Link
              to={banner.ctaHref || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/20 bg-white/12 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              {banner.ctaLabel || "Schedule an Interaction"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;
