import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const CtaBanner = () => {
  const { settings } = useSite();

  return (
    <section className="section-space pt-0">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[36px] bg-gradient-to-r from-midnight via-slateblue to-[#193d67] p-8 text-white shadow-soft sm:p-10 lg:p-14"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-aqua">Let’s Build Forward</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to shape a stronger technology and talent roadmap?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
                Partner with {settings?.companyName || "our team"} to design practical transformation programs with measurable business outcomes.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-midnight transition hover:bg-aqua"
            >
              Schedule a Discovery Session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;

