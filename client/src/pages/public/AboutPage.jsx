import { motion } from "framer-motion";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import eduTechImage from "../../assets/illustrations/edutech.svg";

const AboutPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";

  return (
    <>
      <SEO
        title={`About | ${settings?.companyName}`}
        description={settings?.about?.overview}
      />
      <section className="section-space">
        <div className="page-shell space-y-12">
          <SectionHeading
            eyebrow="About"
            title="About Us: a practical partner for IT training, marketing, staffing, and product development."
            description={
              settings?.about?.overview ||
              `${companyName} builds job-ready training programs, digital marketing systems, IT staffing pipelines, and product development teams that help organizations move with more confidence.`
            }
          />

          <div className="glass-panel overflow-hidden">
            <div className="grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">How we work</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-midnight">
                  Training, marketing, staffing, and product delivery built into one polished operating model.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Modern organizations need more than isolated vendors. They need a partner that can train job-ready
                  talent, generate qualified demand, staff technical roles, build reliable products, and keep performance
                  visible after launch.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "IT Training & Placement", body: "Role-based programs, live projects, interview support, and placement workflows." },
                    { title: "Marketing engines", body: "SEO, campaigns, content, automation, and conversion reporting." },
                    { title: "IT staffing", body: "Flexible hiring models aligned to technical roles, fit, and ramp speed." },
                    { title: "IT product development", body: "Web apps, portals, APIs, dashboards, integrations, QA, and support." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-5 shadow-panel">
                      <p className="text-sm font-bold text-midnight">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-panel">
                <img src={eduTechImage} alt="Digital platform preview" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "Overview", body: settings?.about?.overview },
              { title: "Mission", body: settings?.about?.mission },
              { title: "Vision", body: settings?.about?.vision },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
                <p className="mt-4 text-base leading-8 text-slate-700">{item.body}</p>
              </motion.article>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { label: "Learner completion support", value: "Mentors + community + nudges" },
              { label: "AI-ready workflows", value: "Automation + data quality + governance" },
              { label: "Premium digital presence", value: "Messaging + UX + conversion paths" },
              { label: "Insights for leaders", value: "Dashboards + reporting + next actions" },
            ].map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-7 shadow-panel"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">C2C model</p>
                <p className="mt-3 text-lg font-bold text-midnight">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.value}</p>
              </motion.article>
            ))}
          </div>

          <div>
            <SectionHeading
              eyebrow="Leadership Team"
              title="Leaders focused on refined execution and measurable outcomes."
              description="Teams across technology, talent, growth, and academies, guided by practical delivery standards."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {(settings?.leadershipTeam || []).map((leader, index) => (
                <motion.article
                  key={leader.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-panel overflow-hidden"
                >
                  {leader.image ? (
                    <img src={leader.image} alt={leader.name} className="h-72 w-full object-cover" loading="lazy" />
                  ) : null}
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-bold text-midnight">{leader.name}</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{leader.role}</p>
                    <p className="mt-5 text-sm leading-7 text-slate-600">{leader.bio}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
