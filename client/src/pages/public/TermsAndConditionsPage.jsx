import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileSignature,
  Mail,
  Scale,
  ShieldAlert,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";

const quickTerms = [
  {
    icon: BadgeCheck,
    label: "Use responsibly",
    text: "Do not misuse the website, attempt unauthorized access, or interfere with service availability.",
  },
  {
    icon: BookOpenCheck,
    label: "Programs may evolve",
    text: "Course structures, assessments, certificates, and program details may change as services improve.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Service terms apply",
    text: "Specific proposals, invoices, staffing agreements, or program documents may include additional terms.",
  },
];

const sections = [
  {
    id: "acceptance",
    title: "Acceptance Of Terms",
    body: [
      "These Terms and Conditions apply to your use of this website, learner portal, contact forms, course pages, career forms, and related services. By accessing the website, you agree to these terms.",
    ],
  },
  {
    id: "site-use",
    title: "Use Of The Website",
    items: [
      "Use the website only for lawful purposes and in a way that does not disrupt service operations.",
      "Do not attempt unauthorized access, scraping, reverse engineering, credential misuse, or security testing without written permission.",
      "Content is provided for informational purposes and may change without notice.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts And Eligibility",
    items: [
      "You are responsible for maintaining the confidentiality of your login credentials and OTP access.",
      "Information you provide must be accurate, current, and under your control.",
      "We may suspend or terminate accounts for misuse, fraud, abuse, or policy violations.",
    ],
  },
  {
    id: "learning",
    title: "Programs, Learning Content, And Certificates",
    body: [
      "Program structures, curricula, assessments, projects, mentor support, and certificates may evolve. Completion records or certificates may require defined criteria such as attendance, assignments, assessments, project reviews, payment status, or admin approval.",
    ],
  },
  {
    id: "services",
    title: "EduTech, Digital Marketing, IT Services, And Staffing",
    items: [
      "EduTech services may include course pages, learner dashboards, assessments, certificates, and learning operations support.",
      "Digital marketing services may include strategy, SEO, content, campaigns, analytics, and conversion workflows.",
      "IT services may include application development, cloud, data, automation, integrations, managed support, and security-aligned delivery.",
      "Staffing services may be governed by separate role requirements, hiring terms, candidate screening rules, and client agreements.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    body: [
      "Unless otherwise stated, all content, branding, designs, copy, graphics, and materials on this website are owned by or licensed to the company. You may not reproduce, distribute, or modify them without permission.",
    ],
  },
  {
    id: "payments",
    title: "Payments And Refunds",
    body: [
      "If a program or service requires payment, fees, taxes, billing terms, and refund terms will be shown at checkout, in an invoice, or in program documentation. Payment processing may be provided by third-party processors.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Links And Tools",
    body: [
      "The website may link to third-party services or use external tools for hosting, analytics, payments, email, SMS, maps, or media. We are not responsible for third-party content, policies, or practices.",
    ],
  },
  {
    id: "liability",
    title: "Disclaimer And Limitation Of Liability",
    items: [
      "The website is provided as is without warranties of any kind to the extent permitted by law.",
      "We do not guarantee uninterrupted access, error-free operation, or specific business, hiring, marketing, or learning outcomes.",
      "To the extent permitted by law, we are not liable for indirect, incidental, special, consequential, punitive, or revenue-related damages.",
    ],
  },
  {
    id: "changes",
    title: "Changes To These Terms",
    body: [
      "We may update these terms periodically. Continued use of the website after changes means you accept the updated terms.",
    ],
  },
];

const TermsAndConditionsPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const contactEmail = settings?.contact?.email || "legal@example.com";
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <>
      <SEO title={`Terms and Conditions | ${companyName}`} description={`Website terms and conditions for ${companyName}.`} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,17,31,0.05),transparent_42%),radial-gradient(circle_at_78%_12%,rgba(15,118,110,0.14),transparent_28%)]" />
        <div className="page-shell relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Legal Center</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-midnight sm:text-5xl">
                Terms and Conditions
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                The rules for using {companyName}'s website, learner portal, content, course features, service pages,
                contact forms, staffing workflows, and digital services.
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-6 shadow-panel">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-midnight p-3 text-white">
                  <FileSignature className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Effective date</p>
                  <p className="mt-2 text-2xl font-bold text-midnight">{lastUpdated}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Use of the website means acceptance of these terms.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {quickTerms.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-panel"
                >
                  <Icon className="h-6 w-6 text-[#0f766e]" />
                  <h2 className="mt-4 text-lg font-bold text-midnight">{item.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit rounded-[22px] border border-slate-200 bg-white p-5 shadow-panel lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Agreement sections</p>
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
                    {section.id === "liability" ? <ShieldAlert className="h-5 w-5" /> : <Scale className="h-5 w-5" />}
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
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Legal questions</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Need clarification on these terms?</h2>
                  <p className="mt-2 text-sm leading-7 text-white/70">Send us the question and the relevant service or program name.</p>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-[#dff7f1]"
                >
                  <Mail className="h-4 w-4" />
                  Contact legal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditionsPage;
