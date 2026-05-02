import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import industryCardImage from "../../assets/illustrations/industry-card.svg";

const IndustrySolutionsSection = ({ industries = [], services = [] }) => {
  const featuredIndustries = industries.slice(0, 6);
  const topIndustries = featuredIndustries.slice(0, 2);
  const bottomIndustries = featuredIndustries.slice(2, 6);

  return (
    <section id="industries" className="section-space bg-white">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#5a74a6]">Industry-Focused Solutions</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-midnight">
              Built on Innovation, Data, and Delivery Expertise
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Our enterprise services help organizations modernize, automate, and scale with clarity. From strategy to
              execution, we deliver programs tuned to the needs of each industry.
            </p>
            <Link to="/services" className="mt-8 primary-pill">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {topIndustries.map((industry, index) => (
                <motion.article
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-[#f5f7fb] shadow-panel">
                    <img
                      src={
                        services[index % Math.max(services.length, 1)]?.image ||
                        industryCardImage
                      }
                      alt={industry.title}
                      className="h-[156px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-3 text-center text-lg font-bold text-midnight">{industry.title}</h3>
                </motion.article>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {bottomIndustries.map((industry, index) => (
                <motion.article
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (index + 2) * 0.05 }}
                >
                  <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-[#f5f7fb] shadow-panel">
                    <img
                      src={
                        services[(index + 2) % Math.max(services.length, 1)]?.image ||
                        industryCardImage
                      }
                      alt={industry.title}
                      className="h-[118px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-3 text-center text-base font-bold text-midnight">{industry.title}</h3>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutionsSection;
