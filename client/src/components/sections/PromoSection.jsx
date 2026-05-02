import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import promoImage from "../../assets/illustrations/promo-genai.svg";

const PromoSection = () => {
  const { settings } = useSite();
  const promo = settings?.promoBanner || {};

  return (
    <section className="navy-surface">
      <div className="page-shell">
        <div className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto h-[250px] w-full max-w-[340px] overflow-hidden rounded-[24px] border border-[#7fa7ff]/45 bg-gradient-to-br from-[#162d57] via-[#263d7a] to-[#4630a2] p-4 text-white"
          >
            <div className="absolute inset-0 dot-matrix opacity-15" />
            <img
              src={promoImage}
              alt="Generative AI"
              className="relative h-full w-full rounded-[18px] object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9ee7da]">
              {promo.eyebrow || "Generative AI and Automation"}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {promo.title || "Classy digital experiences, practical AI workflows, and teams that can operate them."}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{promo.description}</p>
            <Link
              to={promo.ctaHref || "/services"}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-[#d8e6ff]"
            >
              {promo.ctaLabel || "Explore GenAI Solutions"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
