import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";

const impactImage =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=82";

const impactCards = [
  {
    title: "IT Training & Placement",
    description: "Role-based tracks, live projects, interview readiness, and placement support for job-ready outcomes.",
    icon: "GraduationCap",
  },
  {
    title: "Digital Marketing",
    description: "SEO, content, paid campaigns, landing pages, automation, and dashboards tied to qualified demand.",
    icon: "LineChart",
  },
  {
    title: "IT Staffing",
    description: "Screened technical talent for contract, contract-to-hire, permanent, and managed team models.",
    icon: "Users",
  },
  {
    title: "IT Product Development",
    description: "Web apps, portals, APIs, dashboards, integrations, QA, deployment, and product support.",
    icon: "MonitorCog",
  },
];

const statCards = [
  { value: "4", label: "Core services", detail: "Training, marketing, staffing, and product delivery." },
  { value: "28", label: "Capability tracks", detail: "Role-aligned learning and delivery paths." },
  { value: "350+", label: "Specialist network", detail: "Developers, trainers, recruiters, designers, and marketers." },
];

const ImpactSection = () => (
  <section className="bg-[#f7f9fc] py-16 sm:py-20 lg:py-24">
    <div className="page-shell">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f766e]">Business Impact</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-midnight sm:text-5xl">
            Practical services that turn skills, demand, talent, and products into measurable growth.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            C2C connects training, placement, digital marketing, IT staffing, and product development into one clear
            execution model. Each service is designed to create visible progress, cleaner operations, and stronger
            outcomes for learners and businesses.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {impactCards.map((card, index) => {
              const Icon = getIcon(card.icon);

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-panel"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9fbf7] text-[#0f766e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-midnight">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </motion.article>
              );
            })}
          </div>

          <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f766e]">
            View Our Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_260px] xl:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft"
          >
            <img
              src={impactImage}
              alt="Team reviewing digital growth and delivery outcomes"
              className="h-[360px] w-full object-cover sm:h-[460px]"
              loading="lazy"
            />
            <div className="grid gap-4 border-t border-slate-200 p-5 sm:grid-cols-3">
              {statCards.map((point) => (
                <div key={point.label}>
                  <p className="font-display text-3xl font-bold text-midnight">{point.value}</p>
                  <p className="mt-1 text-sm font-bold text-midnight">{point.label}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{point.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["Train", "Practical tracks and placement preparation."],
              ["Market", "Campaigns and content that generate demand."],
              ["Build", "Products, portals, APIs, and dashboards."],
            ].map(([label, text], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[20px] bg-midnight p-5 text-white shadow-panel"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-aqua">C2C model</p>
                <p className="mt-3 font-display text-2xl font-bold">{label}</p>
                <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ImpactSection;
