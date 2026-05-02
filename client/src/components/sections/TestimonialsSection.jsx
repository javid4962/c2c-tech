import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { useSite } from "../../context/SiteContext";

const TestimonialsSection = () => {
  const { settings } = useSite();
  const testimonials = settings?.testimonials || [];

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="section-space pt-0">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Client Voice"
          title="Trusted by teams that need confidence as much as capacity."
          description="Selected feedback from organizations using our enterprise services and workforce programs."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.author}-${testimonial.company}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="glass-panel p-8"
            >
              <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
              <div className="mt-8">
                <p className="font-display text-xl font-bold text-midnight">{testimonial.author}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

