import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const CaseStudiesPage = () => {
  const { settings } = useSite();
  const [activeIndustry, setActiveIndustry] = useState("All");
  const { data: caseStudies, loading } = useAsyncData(async () => {
    const { data } = await http.get("/case-studies");
    return data.data;
  }, []);

  const industries = useMemo(
    () => ["All", ...new Set((caseStudies || []).map((item) => item.industry))],
    [caseStudies]
  );

  const filteredCaseStudies = useMemo(() => {
    if (activeIndustry === "All") {
      return caseStudies || [];
    }

    return (caseStudies || []).filter((item) => item.industry === activeIndustry);
  }, [activeIndustry, caseStudies]);

  if (loading) {
    return <LoadingScreen fullScreen label="Loading case studies..." variant="cards" />;
  }

  return (
    <>
      <SEO
        title={`Case Studies | ${settings?.companyName}`}
        description="Browse polished transformation stories across platforms, cloud, AI, growth, staffing, and learning."
      />
      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Case Studies"
            title="Outcome-driven stories with the proof, polish, and operating detail buyers expect."
            description="Filter by industry to explore modernization, AI operations, premium growth, staffing, and academy engagements."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveIndustry(industry)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  activeIndustry === industry ? "bg-midnight text-white" : "bg-white text-slate-600"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filteredCaseStudies.map((caseStudy, index) => (
              <motion.article
                key={caseStudy._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel overflow-hidden"
              >
                {caseStudy.coverImage ? (
                  <img src={caseStudy.coverImage} alt={caseStudy.title} className="h-64 w-full object-cover" loading="lazy" />
                ) : null}
                <div className="p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{caseStudy.industry}</p>
                  <h2 className="mt-4 font-display text-3xl font-bold text-midnight">{caseStudy.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{caseStudy.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {(caseStudy.tags || []).map((tag) => (
                      <span key={tag} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/case-studies/${caseStudy.slug}`}
                    className="mt-8 inline-flex rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                  >
                    Read the full story
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
