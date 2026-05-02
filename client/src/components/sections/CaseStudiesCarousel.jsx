import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

const CaseStudiesCarousel = ({ caseStudies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (caseStudies.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % caseStudies.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [caseStudies.length]);

  if (!caseStudies.length) {
    return null;
  }

  const activeCaseStudy = caseStudies[currentIndex];

  return (
    <section className="section-space pt-0">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Case Studies"
          title="Proof points that show how strategy turns into measurable outcomes."
          description="Browse outcome-led transformation stories across sectors and service lines."
        />

        <div className="mt-10 overflow-hidden rounded-[36px] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <motion.img
              key={activeCaseStudy.coverImage}
              src={activeCaseStudy.coverImage}
              alt={activeCaseStudy.title}
              loading="lazy"
              initial={{ opacity: 0.5, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="flex flex-col justify-between p-8 sm:p-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{activeCaseStudy.industry}</p>
                <h3 className="mt-4 font-display text-3xl font-bold text-midnight">{activeCaseStudy.title}</h3>
                <p className="mt-5 text-base leading-8 text-slate-600">{activeCaseStudy.summary}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {(activeCaseStudy.metrics || []).map((metric) => (
                    <div key={`${metric.label}-${metric.value}`} className="rounded-3xl bg-mist p-4">
                      <p className="text-2xl font-extrabold text-midnight">{metric.value}</p>
                      <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to={`/case-studies/${activeCaseStudy.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                >
                  Read full story
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((current) => (current - 1 + caseStudies.length) % caseStudies.length)}
                    className="rounded-full border border-slate-200 p-3 text-midnight"
                    aria-label="Previous case study"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((current) => (current + 1) % caseStudies.length)}
                    className="rounded-full border border-slate-200 p-3 text-midnight"
                    aria-label="Next case study"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCarousel;

