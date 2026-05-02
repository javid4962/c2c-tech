import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import featurePreview from "../../assets/illustrations/feature-preview.svg";

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
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f766e]">Service Expertise</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-midnight">
              Turning training, marketing, staffing, and product ideas into measurable progress.
            </h2>
          </div>
          <Link to="/services" className="primary-pill">
            Explore Our Services
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
              src={featureImage || featurePreview}
              alt="C2C service delivery preview"
              className="h-[430px] w-full bg-[#f7f9fd] object-cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = featurePreview;
              }}
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
