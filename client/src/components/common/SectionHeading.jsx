import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description, align = "left", theme = "light" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.6 }}
    className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
  >
    {eyebrow ? (
      <p className={`mb-3 text-sm font-bold uppercase tracking-[0.25em] ${theme === "dark" ? "text-slate-300" : "text-slate-500"}`}>
        {eyebrow}
      </p>
    ) : null}
    <h2 className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${theme === "dark" ? "text-white" : "text-midnight"}`}>
      {title}
    </h2>
    {description ? (
      <p className={`mt-4 text-lg leading-8 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
    ) : null}
  </motion.div>
);

export default SectionHeading;
