import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSite();
  const { data: service, loading } = useAsyncData(async () => {
    const { data } = await http.get(`/services/${slug}`);
    return data.data;
  }, [slug]);

  if (loading) {
    return <LoadingScreen fullScreen label="Loading service..." variant="page" />;
  }

  if (!service) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${service.seoTitle || service.title} | ${settings?.companyName}`}
        description={service.seoDescription || service.shortDescription}
        image={service.image}
      />
      <section className="section-space">
        <div className="page-shell">
          <div className="overflow-hidden rounded-[36px] bg-white shadow-soft">
            {service.image ? (
              <img src={service.image} alt={service.title} className="h-72 w-full object-cover sm:h-[360px]" loading="lazy" />
            ) : null}
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Service Detail</p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-midnight">{service.title}</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">{service.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {(service.process || []).map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="rounded-[28px] bg-mist p-5"
                    >
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                        Step {index + 1}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[32px] bg-midnight p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-aqua">What You Gain</p>
                  <div className="mt-6 space-y-4">
                    {(service.highlights || []).map((item) => (
                      <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Industry Fit</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {(service.industryFocus || []).map((industry) => (
                      <span key={industry} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
                        {industry}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                  >
                    Discuss this service
                    <ArrowRight className="h-4 w-4" />
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

export default ServiceDetailPage;

