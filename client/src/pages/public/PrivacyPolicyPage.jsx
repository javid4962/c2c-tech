import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Cookie,
  Database,
  FileLock2,
  Fingerprint,
  KeyRound,
  Mail,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";

const summaryCards = [
  {
    icon: Fingerprint,
    label: "Identity and OTP",
    text: "Name, email, phone number, password status, and phone OTP activity help us protect learner access.",
  },
  {
    icon: Database,
    label: "Learning records",
    text: "Enrollments, progress, assessments, certificates, and support history keep learning services accurate.",
  },
  {
    icon: ClipboardCheck,
    label: "Service requests",
    text: "Contact forms, staffing inquiries, resumes, and project messages help us route the right specialist.",
  },
  {
    icon: ShieldCheck,
    label: "Security signals",
    text: "Device, browser, diagnostic, and fraud-prevention data help maintain a reliable platform.",
  },
];

const privacyPrinciples = [
  "We collect information for clear operating, support, learning, security, and service-delivery purposes.",
  "We do not sell personal information.",
  "We limit sharing to trusted providers that support hosting, email, SMS, analytics, payments, storage, and operations.",
];

const sections = [
  {
    id: "scope",
    icon: UserRoundCheck,
    title: "Who This Policy Applies To",
    body: [
      "This policy applies to visitors, prospective learners, enrolled learners, hiring partners, clients, and contacts who interact with our website, platform, forms, and learning services.",
    ],
  },
  {
    id: "collection",
    icon: Database,
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
    icon: KeyRound,
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
    icon: Cookie,
    title: "Cookies And Similar Technologies",
    body: [
      "We use cookies and similar technologies for authentication, analytics, core site functionality, and security. You can control cookies through your browser settings, but some features may not work correctly without them.",
    ],
  },
  {
    id: "sharing",
    icon: ShieldCheck,
    title: "Data Sharing",
    body: [
      "We do not sell personal information. We may share limited information with service providers that support hosting, analytics, email, SMS delivery, payment processing, cloud storage, and business operations under appropriate safeguards.",
    ],
  },
  {
    id: "retention",
    icon: RefreshCcw,
    title: "Retention And Your Choices",
    items: [
      "We retain data for as long as needed to provide services, meet contractual or legal obligations, resolve disputes, and maintain security.",
      "You may request access, correction, deletion, or export of your data where required by law.",
      "You can opt out of non-essential communications by contacting us or using available unsubscribe controls.",
    ],
  },
  {
    id: "children",
    icon: Smartphone,
    title: "Children's Privacy",
    body: [
      "Our services are intended for users who can legally consent to data processing in their jurisdiction. If we learn that we collected data from a child without appropriate consent, we will take steps to delete it.",
    ],
  },
];

const PrivacyPolicyPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "C2C Tech Solutions";
  const contactEmail = settings?.contact?.email || "info@c2ctech.com";
  const contactPhone = settings?.contact?.phone || "+91-7093182525";
  const phoneHref = contactPhone.replace(/[^\d+]/g, "");
  const lastUpdated = "May 2, 2026";

  return (
    <>
      <SEO title={`Privacy Policy | ${companyName}`} description={`Privacy policy for ${companyName}.`} />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 dot-matrix opacity-10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="page-shell relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
                <FileLock2 className="h-4 w-4 text-aqua" />
                Legal Center
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                Privacy Policy
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                A clear view of how {companyName} collects, uses, protects, and retains information across the website,
                learner portal, OTP authentication, contact forms, staffing workflows, and service delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#scope"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-aqua"
                >
                  Read policy
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-aqua hover:text-aqua"
                >
                  <Mail className="h-4 w-4" />
                  Privacy contact
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
                  <p className="text-sm font-semibold text-slate-300">Last updated</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">{lastUpdated}</p>
                </div>
                <div className="rounded-2xl bg-aqua/15 p-3 text-aqua">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  ["Primary contact", contactEmail],
                  ["Policy scope", "Website, learning, services, staffing"],
                  ["Account protection", "Email login and phone OTP"],
                  ["Data requests", "Access, correction, deletion, export"],
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
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.05 }}
                  className="rounded-[22px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
                >
                  <Icon className="h-6 w-6 text-aqua" />
                  <h2 className="mt-4 text-lg font-bold text-white">{card.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="page-shell grid gap-4 md:grid-cols-3">
          {privacyPrinciples.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-3 rounded-[18px] border border-slate-200 bg-frost p-5"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0f766e]" />
              <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#f7f9fc]">
        <div className="page-shell grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[22px] border border-slate-200 bg-white p-5 shadow-panel">
              <p className="text-xs font-bold uppercase text-slate-500">On this page</p>
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
                <p className="text-xs font-semibold uppercase text-white/55">Need help?</p>
                <p className="mt-2 text-sm leading-6 text-white/75">Send privacy and data requests to our team.</p>
                <a href={`mailto:${contactEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-aqua">
                  Email privacy
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ecfdf8] text-[#0f766e]">
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
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0f766e]" />
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
                  <p className="text-xs font-bold uppercase text-white/50">Contact</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Questions about privacy?</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                    We will route privacy, data access, correction, deletion, and export requests to the right team.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight transition hover:bg-aqua"
                  >
                    <Mail className="h-4 w-4" />
                    Email us
                  </a>
                  <a
                    href={`tel:${phoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-aqua hover:text-aqua"
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

export default PrivacyPolicyPage;
