import { motion } from "framer-motion";
import worldMapDots from "../../assets/world-map-dots.svg";
import { useSite } from "../../context/SiteContext";

const ImpactSection = ({ expertiseCards = [] }) => {
  const { settings } = useSite();
  const proofPoints = settings?.proofPoints || [];
  const leadingCards = expertiseCards.slice(0, 3);
  const statCards = proofPoints.slice(0, 3);

  return (
    <section className="section-space bg-[#fbfbfd] pt-10">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr_0.38fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#5a74a6]">Business Impact</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-midnight">
              Built for enterprises that need transformation to show up in real, measurable results.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
              We partner with organizations worldwide to modernize operations, unify data, and unlock better decision
              making through AI, cloud, and digital engineering.
            </p>

            <div className="mt-8 space-y-4">
              {leadingCards.map((card, index) => (
                <div key={card.title} className="flex gap-4 rounded-[18px] bg-white px-5 py-4 shadow-panel">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slateblue">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-midnight">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <img src={worldMapDots} alt="World map" className="w-full max-w-[560px]" loading="lazy" />
          </div>

          <div className="rounded-[22px] bg-midnight px-6 py-8 text-white shadow-[0_24px_70px_rgba(7,23,49,0.18)]">
            <div className="space-y-7">
              {statCards.map((point, index) => (
                <motion.article
                  key={`${point.label}-${point.value}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={index < statCards.length - 1 ? "border-b border-white/10 pb-6" : ""}
                >
                  <p className="font-display text-4xl font-bold">{point.value}</p>
                  <p className="mt-2 text-sm font-semibold text-white/85">{point.label}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
