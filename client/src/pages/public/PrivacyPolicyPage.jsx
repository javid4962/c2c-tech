import { motion } from "framer-motion";
import { CheckCircle2, Cookie, Database, FileLock2, Mail, ShieldCheck, UserRoundCheck } from "lucide-react";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";

const summaryCards = [
  {
    icon: UserRoundCheck,
    label: "Account and identity",
    text: "We collect the information needed to create accounts, verify phone OTP access, and support learners.",
  },
  {
    icon: Database,
    label: "Learning records",
    text: "Enrollments, progress, assessments, and certificate status are used to operate learning services.",
  },
  {
    icon: ShieldCheck,
    label: "Security controls",
    text: "We use reasonable technical and operational safeguards to protect platform and form data.",
  },
];

const sections = [
  {
    id: "scope",
    title: "Who This Policy Applies To",
    body: [
      "This policy applies to visitors, prospective learners, enrolled learners, hiring partners, clients, and contacts who interact with our website, platform, forms, and learning services.",
    ],
  },
  {
    id: "collection",
    title: "Information We Collect",
    items: [
      "Account data: name, email, phone number, password hash, OTP verification status, and basic profile details.",
      "Learning data: enrollments, progress, assessment attempts, course activity, and certificate status.",
      "Contact data: name, email, phone, company, service interest, messages, resumes, and application details.",
      "Usage data: pages visited, browser or device metadata, approximate location, diagnostic logs, and security events.",
    ],
  },
  {
    id: "use",
    title: "How We Use Information",
    items: [
      "Create and manage learner accounts, enrollments, dashboards, support workflows, and certificates.",
      "Respond to inquiries, staffing requests, admissions questions, and partnership conversations.",
      "Improve website performance, digital marketing journeys, platform reliability, and user experience.",
      "Protect accounts, prevent fraud or abuse, verify OTP requests, and comply with legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies And Similar Technologies",
    body: [
      "We use cookies and similar technologies for authentication, analytics, core site functionality, and security. You can control cookies through your browser settings, but some features may not work correctly without them.",
    ],
  },
  {
    id: "sharing",
    title: "Data Sharing",
    body: [
      "We do not sell personal information. We may share limited information with service providers that support hosting, analytics, email, SMS delivery, payment processing, cloud storage, and business operations under appropriate safeguards.",
    ],
  },
  {
    id: "retention",
    title: "Retention And Your Choices",
    items: [
      "We retain data for as long as needed to provide services, meet contractual or legal obligations, resolve disputes, and maintain security.",
      "You may request access, correction, deletion, or export of your data where required by law.",
      "You can opt out of non-essential communications by contacting us or using available unsubscribe controls.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: [
      "Our services are intended for users who can legally consent to data processing in their jurisdiction. If we learn that we collected data from a child without appropriate consent, we will take steps to delete it.",
    ],
  },
];

const PrivacyPolicyPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const contactEmail = settings?.contact?.email || "privacy@example.com";
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <>
      <SEO title={`Privacy Policy | ${companyName}`} description={`Privacy policy for ${companyName}.`} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f7fafc]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(15,118,110,0.12),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(255,138,91,0.12),transparent_26%)]" />
        <div className="page-shell relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Legal Center</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-midnight sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                A clear view of how {companyName} collects, uses, protects, and retains information across our website,
                learner portal, OTP authentication, contact forms, and services.
              </p>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-6 shadow-panel">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-midnight p-3 text-white">
                  <FileLock2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Last updated</p>
                  <p className="mt-2 text-2xl font-bold text-midnight">{lastUpdated}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Questions can be sent to {contactEmail}.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-panel"
                >
                  <Icon className="h-6 w-6 text-[#0f766e]" />
                  <h2 className="mt-4 text-lg font-bold text-midnight">{card.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit rounded-[22px] border border-slate-200 bg-white p-5 shadow-panel lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">On this page</p>
            <nav className="mt-4 grid gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-mist hover:text-midnight"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-5">
            {sections.map((section, index) => (
              <motion.article
                id={section.id}
                key={section.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-panel sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 hidden rounded-2xl bg-[#ecfdf8] p-3 text-[#0f766e] sm:block">
                    {section.id === "cookies" ? <Cookie className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl font-bold text-midnight">{section.title}</h2>
                    {section.body?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                    {section.items ? (
                      <div className="mt-5 grid gap-3">
                        {section.items.map((item) => (
                          <div key={item} className="flex gap-3 rounded-2xl bg-[#f7f9fd] p-4 text-sm leading-7 text-slate-700">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0f766e]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="rounded-[24px] border border-slate-200 bg-midnight p-6 text-white shadow-panel sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Contact</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Questions about privacy?</h2>
                  <p className="mt-2 text-sm leading-7 text-white/70">We will route privacy and data requests to the right team.</p>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-[#dff7f1]"
                >
                  <Mail className="h-4 w-4" />
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
