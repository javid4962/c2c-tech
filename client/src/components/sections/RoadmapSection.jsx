import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import { useSite } from "../../context/SiteContext";

const accentClasses = [
  "bg-[#fff6f2] text-[#7d4830] border-[#ffccb8]",
  "bg-[#defcf6] text-[#0f6b6c] border-[#9ce9d8]",
  "bg-[#ffe8fb] text-[#8b3676] border-[#ffb7f0]",
  "bg-[#eaf1ff] text-[#315db2] border-[#bfd3ff]",
  "bg-[#fff6f2] text-[#7d4830] border-[#ffccb8]",
  "bg-[#8de0f8] text-[#073a57] border-[#6bcde9]",
  "bg-[#f7aee8] text-[#5b2051] border-[#ef89da]",
  "bg-[#d4c5ff] text-[#342768] border-[#baa7ff]",
];

const desktopPositions = [
  "lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2",
  "lg:absolute lg:right-0 lg:top-8",
  "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2",
  "lg:absolute lg:right-6 lg:bottom-14",
  "lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2",
  "lg:absolute lg:left-6 lg:bottom-14",
  "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2",
  "lg:absolute lg:left-0 lg:top-8",
];

const RoadmapPill = ({ item, index }) => {
  const Icon = getIcon(item.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-full border px-5 py-3 shadow-[0_10px_24px_rgba(6,20,42,0.16)] ${accentClasses[index]} ${desktopPositions[index] || ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">{String(index + 1).padStart(2, "0")}</p>
          <p className="mt-1 text-sm font-bold">{item.title}</p>
        </div>
        <Icon className="h-4 w-4 opacity-75" />
      </div>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const { settings } = useSite();
  const roadmap = (settings?.roadmap || []).slice(0, 8);

  return (
    <section className="navy-surface">
      <div className="page-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#93b7ff]">Key Strategies for Success</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-white sm:text-[2.9rem]">
              Driving Measurable Business Success
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/72">
              Our engagement framework aligns people, process, and technology so transformation stays practical,
              governed, and accountable from discovery through scale.
            </p>
            <Link
              to="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Our Approach
            </Link>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:min-h-[430px] lg:grid-cols-1">
              {roadmap.map((item, index) => (
                <RoadmapPill key={`${item.title}-${index}`} item={item} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto mt-6 flex h-[230px] w-[230px] items-center justify-center rounded-[22px] border border-white/12 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.2)] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
            >
              <div className="absolute inset-0 rounded-[22px] border border-white/8 dot-matrix opacity-15" />
              <div className="relative flex h-[122px] w-[122px] items-center justify-center rounded-[20px] bg-white/90 text-slateblue">
                <span className="font-display text-4xl font-bold">AI</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
