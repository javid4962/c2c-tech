import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";

const approachImage =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=82";

const serviceChips = ["IT Training", "Digital Marketing", "IT Staffing", "Product Development"];

const approachSteps = [
  {
    title: "Discover the goal",
    description: "Clarify training needs, marketing gaps, hiring demand, product scope, and business outcomes.",
    icon: "Sparkles",
  },
  {
    title: "Design the plan",
    description: "Shape the curriculum, campaign, staffing model, or product roadmap with clear ownership.",
    icon: "Workflow",
  },
  {
    title: "Build the assets",
    description: "Create learning tracks, content, shortlists, interfaces, APIs, dashboards, and launch workflows.",
    icon: "MonitorCog",
  },
  {
    title: "Launch with control",
    description: "Release cohorts, campaigns, teams, or products with checkpoints, reporting, and support.",
    icon: "Rocket",
  },
  {
    title: "Measure performance",
    description: "Track learner progress, lead quality, hiring speed, product usage, and operational quality.",
    icon: "BarChart3",
  },
  {
    title: "Improve and scale",
    description: "Expand what works across roles, channels, hiring pipelines, releases, and business units.",
    icon: "Lightbulb",
  },
];

const RoadmapSection = () => (
  <section id="our-approach" className="scroll-mt-24 bg-[#07111f]">
    <div className="page-shell py-16 sm:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-aqua">Our Approach</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            A focused delivery method for training, marketing, staffing, and product development.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            We keep the process clear: understand the goal, design the right model, build the assets, launch with
            control, and improve from real performance data.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {serviceChips.map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/80">
                {item}
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-aqua"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-[0.82fr_1fr] xl:items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/8 shadow-soft"
          >
            <img
              src={approachImage}
              alt="C2C team planning training, staffing, marketing, and product delivery"
              className="h-[360px] w-full object-cover opacity-90 sm:h-[520px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/12 bg-[#07111f]/85 p-5 text-white backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-aqua">One operating rhythm</p>
              <p className="mt-2 text-lg font-bold">Plan, build, launch, measure, and scale with the same delivery team.</p>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {approachSteps.map((item, index) => {
              const Icon = getIcon(item.icon);

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.42, delay: index * 0.04 }}
                  className="rounded-[20px] border border-white/10 bg-white/[0.07] p-4 text-white backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-aqua/15 text-aqua">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RoadmapSection;
