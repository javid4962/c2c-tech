import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";

const ExpertiseCard = ({ service, index }) => {
  const Icon = getIcon(service.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-5 shadow-panel"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4fb] text-slateblue">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-midnight">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.shortDescription}</p>
    </motion.article>
  );
};

const ExpertiseSection = ({ services = [], featureImage }) => {
  const left = services.slice(0, 2);
  const right = services.slice(2, 4);

  return (
    <section className="section-space bg-white pt-10">
      <div className="page-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#5a74a6]">AI-Powered Expertise</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-midnight">
              Turning Modernization into Measurable Impact
            </h2>
          </div>
          <Link to="/services" className="primary-pill">
            Explore Capabilities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_0.95fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            {left.map((service, index) => (
              <ExpertiseCard key={service._id} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-panel"
          >
            <img
              src={
                featureImage ||
                "https://images.unsplash.com/photo-1516321310764-8d45b91374f3?auto=format&fit=crop&w=1200&q=80"
              }
              alt="Enterprise technology collaboration"
              className="h-[430px] w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="space-y-5">
            {right.map((service, index) => (
              <ExpertiseCard key={service._id} service={service} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
