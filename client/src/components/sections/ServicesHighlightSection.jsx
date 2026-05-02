import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import { getIcon } from "../../utils/icons";

const ServicesHighlightSection = ({ services = [] }) => (
  <section className="section-space">
    <div className="page-shell">
      <SectionHeading
        eyebrow="Capability Stack"
        title="Integrated services for enterprise transformation."
        description="Flexible delivery models across technology, growth, staffing, and training programs."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = getIcon(service.icon);

          return (
            <motion.article
              key={service._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel flex h-full flex-col p-6"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-midnight text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-midnight">{service.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{service.shortDescription}</p>
              <Link
                to={`/services/${service.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slateblue"
              >
                Explore service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesHighlightSection;

