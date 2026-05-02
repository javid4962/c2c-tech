import { Link, useParams } from "react-router-dom";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSite();
  const { data: caseStudy, loading } = useAsyncData(async () => {
    const { data } = await http.get(`/case-studies/${slug}`);
    return data.data;
  }, [slug]);

  if (loading) {
    return <LoadingScreen fullScreen label="Loading case study..." variant="page" />;
  }

  if (!caseStudy) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${caseStudy.seoTitle || caseStudy.title} | ${settings?.companyName}`}
        description={caseStudy.seoDescription || caseStudy.summary}
        image={caseStudy.coverImage}
      />
      <section className="section-space">
        <div className="page-shell">
          <div className="overflow-hidden rounded-[36px] bg-white shadow-soft">
            {caseStudy.coverImage ? (
              <img src={caseStudy.coverImage} alt={caseStudy.title} className="h-72 w-full object-cover sm:h-[380px]" loading="lazy" />
            ) : null}
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{caseStudy.industry}</p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-midnight">{caseStudy.title}</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">{caseStudy.summary}</p>

                <div className="mt-10 space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-midnight">Challenge</h2>
                    <p className="mt-4 text-base leading-8 text-slate-600">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-midnight">Solution</h2>
                    <p className="mt-4 text-base leading-8 text-slate-600">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-midnight">Outcome</h2>
                    <p className="mt-4 text-base leading-8 text-slate-600">{caseStudy.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[32px] bg-midnight p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-aqua">Impact Snapshot</p>
                  <div className="mt-6 grid gap-4">
                    {(caseStudy.metrics || []).map((metric) => (
                      <div key={`${metric.label}-${metric.value}`} className="rounded-2xl bg-white/10 p-4">
                        <p className="text-2xl font-extrabold">{metric.value}</p>
                        <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Related Services</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {(caseStudy.services || []).map((service) => (
                      <span key={service} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
                        {service}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                  >
                    Talk about a similar challenge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetailPage;

