import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Copyright,
  CreditCard,
  FileSignature,
  KeyRound,
  Link2,
  Mail,
  Phone,
  RefreshCcw,
  Scale,
  ShieldAlert,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";

const quickTerms = [
  {
    icon: BadgeCheck,
    label: "Use responsibly",
    text: "Use the website and learner tools lawfully, accurately, and without disrupting service availability.",
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
  {
    icon: ShieldAlert,
    label: "No misuse",
    text: "Unauthorized access, scraping, reverse engineering, credential misuse, and abusive behavior are prohibited.",
  },
];

const agreementNotes = [
  "Website content is provided for information and may change without notice.",
  "Learner accounts and phone OTP access must remain under the user's control.",
  "Separate written agreements may govern paid services, staffing, or enterprise projects.",
];

const sections = [
  {
    id: "acceptance",
    icon: FileSignature,
    title: "Acceptance Of Terms",
    body: [
      "These Terms and Conditions apply to your use of this website, learner portal, contact forms, course pages, career forms, and related services. By accessing the website, you agree to these terms.",
    ],
  },
  {
    id: "site-use",
    icon: BadgeCheck,
    title: "Use Of The Website",
    items: [
      "Use the website only for lawful purposes and in a way that does not disrupt service operations.",
      "Do not attempt unauthorized access, scraping, reverse engineering, credential misuse, or security testing without written permission.",
      "Content is provided for informational purposes and may change without notice.",
    ],
  },
  {
    id: "accounts",
    icon: KeyRound,
    title: "Accounts And Eligibility",
    items: [
      "You are responsible for maintaining the confidentiality of your login credentials and OTP access.",
      "Information you provide must be accurate, current, and under your control.",
      "We may suspend or terminate accounts for misuse, fraud, abuse, or policy violations.",
    ],
  },
  {
    id: "learning",
    icon: BookOpenCheck,
    title: "Programs, Learning Content, And Certificates",
    body: [
      "Program structures, curricula, assessments, projects, mentor support, and certificates may evolve. Completion records or certificates may require defined criteria such as attendance, assignments, assessments, project reviews, payment status, or admin approval.",
    ],
  },
  {
    id: "services",
    icon: BriefcaseBusiness,
    title: "IT Training, Digital Marketing, IT Staffing, And Product Development",
    items: [
      "IT Training & Placement services may include training tracks, learner dashboards, assessments, projects, interview preparation, certificates, and placement support.",
      "Digital marketing services may include strategy, SEO, content, campaigns, analytics, and conversion workflows.",
      "IT Staffing services may be governed by separate role requirements, hiring terms, candidate screening rules, onboarding processes, and client agreements.",
      "IT Product Development services may include application development, portals, APIs, dashboards, integrations, QA, deployment, and support.",
    ],
  },
  {
    id: "ip",
    icon: Copyright,
    title: "Intellectual Property",
    body: [
      "Unless otherwise stated, all content, branding, designs, copy, graphics, and materials on this website are owned by or licensed to the company. You may not reproduce, distribute, or modify them without permission.",
    ],
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Payments And Refunds",
    body: [
      "If a program or service requires payment, fees, taxes, billing terms, and refund terms will be shown at checkout, in an invoice, or in program documentation. Payment processing may be provided by third-party processors.",
    ],
  },
  {
    id: "third-party",
    icon: Link2,
    title: "Third-Party Links And Tools",
    body: [
      "The website may link to third-party services or use external tools for hosting, analytics, payments, email, SMS, maps, or media. We are not responsible for third-party content, policies, or practices.",
    ],
  },
  {
    id: "liability",
    icon: ShieldAlert,
    title: "Disclaimer And Limitation Of Liability",
    items: [
      "The website is provided as is without warranties of any kind to the extent permitted by law.",
      "We do not guarantee uninterrupted access, error-free operation, or specific business, hiring, marketing, or learning outcomes.",
      "To the extent permitted by law, we are not liable for indirect, incidental, special, consequential, punitive, or revenue-related damages.",
    ],
  },
  {
    id: "changes",
    icon: RefreshCcw,
    title: "Changes To These Terms",
    body: [
      "We may update these terms periodically. Continued use of the website after changes means you accept the updated terms.",
    ],
  },
];

const TermsAndConditionsPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "C2C Tech Solutions";
  const contactEmail = settings?.contact?.email || "info@c2ctech.com";
  const contactPhone = settings?.contact?.phone || "+91-7093182525";
  const phoneHref = contactPhone.replace(/[^\d+]/g, "");
  const lastUpdated = "May 2, 2026";

  return (
    <>
      <SEO title={`Terms and Conditions | ${companyName}`} description={`Website terms and conditions for ${companyName}.`} />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 dot-matrix opacity-10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="page-shell relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
                <Scale className="h-4 w-4 text-ember" />
                Legal Center
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                Terms and Conditions
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                The operating rules for using {companyName}'s website, learner portal, content, course features,
                service pages, contact forms, staffing workflows, and digital services.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#acceptance"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-ember"
                >
                  Read terms
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-ember hover:text-ember"
                >
                  <Mail className="h-4 w-4" />
                  Legal contact
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="rounded-[26px] border border-white/12 bg-white/[0.06] p-6 shadow-soft backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-300">Effective date</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">{lastUpdated}</p>
                </div>
                <div className="rounded-2xl bg-ember/15 p-3 text-ember">
                  <FileSignature className="h-6 w-6" />
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  ["Applies to", "Website, portal, courses, services"],
                  ["Account access", "Email login and phone OTP"],
                  ["Service scope", "Training, marketing, staffing, products"],
                  ["Contact", contactEmail],
                ].map(([label, value]) => (
                  <div key={label} className="py-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickTerms.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.05 }}
                  className="rounded-[22px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
                >
                  <Icon className="h-6 w-6 text-ember" />
                  <h2 className="mt-4 text-lg font-bold text-white">{item.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="page-shell grid gap-4 md:grid-cols-3">
          {agreementNotes.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-3 rounded-[18px] border border-slate-200 bg-frost p-5"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-ember" />
              <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#f7f9fc]">
        <div className="page-shell grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[22px] border border-slate-200 bg-white p-5 shadow-panel">
              <p className="text-xs font-bold uppercase text-slate-500">Agreement sections</p>
              <nav className="mt-4 grid gap-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-mist hover:text-midnight"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-5 rounded-[18px] bg-midnight p-4 text-white">
                <p className="text-xs font-semibold uppercase text-white/55">Need clarification?</p>
                <p className="mt-2 text-sm leading-6 text-white/75">Send the relevant service, course, or program name with your question.</p>
                <a href={`mailto:${contactEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember">
                  Contact legal
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.article
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-panel sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff2eb] text-ember">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="font-display text-2xl font-bold text-midnight">{section.title}</h2>
                        <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-bold text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {section.body?.map((paragraph) => (
                        <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">
                          {paragraph}
                        </p>
                      ))}
                      {section.items ? (
                        <div className="mt-5 grid gap-3">
                          {section.items.map((item) => (
                            <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-frost p-4 text-sm leading-7 text-slate-700">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ember" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <div className="overflow-hidden rounded-[24px] bg-midnight text-white shadow-panel">
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase text-white/50">Legal questions</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Need clarification on these terms?</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                    Send us the question with the relevant service, course, staffing request, or program name.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-ember"
                  >
                    <Mail className="h-4 w-4" />
                    Contact legal
                  </a>
                  <a
                    href={`tel:${phoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-ember hover:text-ember"
                  >
                    <Phone className="h-4 w-4" />
                    Call us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditionsPage;
