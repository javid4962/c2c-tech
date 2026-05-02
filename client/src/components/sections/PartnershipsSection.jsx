import { motion } from "framer-motion";
import { useSite } from "../../context/SiteContext";

const PartnershipsSection = () => {
  const { settings } = useSite();
  const partners = settings?.partners || [];

  if (!partners.length) {
    return null;
  }

  return (
    <section className="section-space py-14">
      <div className="page-shell">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-panel sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Our Key Partnerships</p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
                Build stronger programs with ecosystem support across cloud, data, talent operations, training, and growth execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {partners.map((partner, index) => (
                <motion.span
                  key={partner.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="rounded-full border border-slate-200 bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {partner.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;

