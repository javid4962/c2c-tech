import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

const TransformationSection = ({ services = [] }) => {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug || "");

  useEffect(() => {
    if (!services.length) {
      return;
    }

    setActiveSlug((current) => current || services[0].slug);
  }, [services]);

  const activeService = services.find((service) => service.slug === activeSlug) || services[0];

  if (!activeService) {
    return null;
  }

  return (
    <section id="transformation" className="section-space pt-10 bg-[#faf9f6]">
      <div className="page-shell">
        <SectionHeading
          align="center"
          eyebrow="Digital Transformation"
          title="A service spotlight that lets visitors move through key transformation plays."
          description="This tabbed module borrows the interaction rhythm of the reference homepage while using your dynamic C2C service data."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <button
              key={service._id}
              type="button"
              onClick={() => setActiveSlug(service.slug)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeSlug === service.slug
                  ? "bg-midnight text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slateblue hover:text-midnight"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="p-8 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Transformation Spotlight</p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-midnight">{activeService.title}</h3>
              <p className="mt-5 text-base leading-8 text-slate-600">{activeService.description}</p>

              <div className="mt-7 space-y-3">
                {(activeService.highlights || []).map((item) => (
                  <div key={item} className="rounded-[18px] bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>

              <Link
                to={`/services/${activeService.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
              >
                View service detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <img
              src={activeService.image}
              alt={activeService.title}
              className="h-full min-h-[320px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
