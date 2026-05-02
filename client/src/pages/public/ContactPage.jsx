import { useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  serviceInterest: "",
  message: "",
};

const ContactPage = () => {
  const { settings, loading: settingsLoading } = useSite();
  const { data: services, loading } = useAsyncData(async () => {
    const { data } = await http.get("/services");
    return data.data;
  }, []);
  const [formState, setFormState] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await http.post("/contacts", formState);
      toast.success("Message sent successfully.");
      setFormState(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send your message.");
    } finally {
      setSubmitting(false);
    }
  };

  if (settingsLoading || loading) {
    return <LoadingScreen fullScreen label="Loading contact..." variant="form" />;
  }

  return (
    <>
      <SEO
        title={`Contact | ${settings?.companyName}`}
        description="Reach out to discuss EduTech, digital marketing, IT services, staffing, or learning operations."
      />
      <section className="section-space">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel p-8">
            <SectionHeading
              eyebrow="Contact"
              title="Talk to us about your next EduTech, marketing, IT, or staffing goal."
              description="We typically respond within 1 business day. Share the goal, and our team will route the right specialist."
            />

            <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-midnight">Email</p>
                <p>{settings?.contact?.email}</p>
              </div>
              <div>
                <p className="font-semibold text-midnight">Phone</p>
                <p>{settings?.contact?.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-midnight">Address</p>
                <p>{settings?.contact?.address}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "EduTech", body: "Course catalogs, learner dashboards, assessments, certificates, and cohort operations." },
                { title: "Digital Marketing", body: "SEO, content systems, paid campaigns, landing pages, and revenue dashboards." },
                { title: "IT Services", body: "Applications, cloud, APIs, data, automation, security, and managed support." },
                { title: "Staffing", body: "IT and non-IT talent, screening, onboarding, managed teams, and workforce reporting." },
              ].map((item) => (
                <div key={item.title} className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-5 shadow-panel">
                  <p className="text-sm font-bold text-midnight">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>

            {settings?.contact?.mapEmbedUrl ? (
              <div className="mt-8 overflow-hidden rounded-[28px]">
                <iframe
                  title="Office location"
                  src={settings.contact.mapEmbedUrl}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>

          <div className="glass-panel p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Send a Message</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-midnight">
              Tell us what you want to build, modernize, or scale.
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Full Name</label>
                  <input
                    type="text"
                    value={formState.fullName}
                    onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Phone</label>
                  <input
                    type="text"
                    value={formState.phone}
                    onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                    className="w-full rounded-2xl border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Company</label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(event) => setFormState((current) => ({ ...current, company: event.target.value }))}
                    className="w-full rounded-2xl border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Service Interest</label>
                <select
                  value={formState.serviceInterest}
                  onChange={(event) => setFormState((current) => ({ ...current, serviceInterest: event.target.value }))}
                  className="w-full rounded-2xl border-slate-200 bg-white"
                >
                  <option value="">Select a service</option>
                  {(services || []).map((service) => (
                    <option key={service._id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Message</label>
                <textarea
                  rows="6"
                  value={formState.message}
                  onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                  className="w-full rounded-2xl border-slate-200 bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-midnight px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              By submitting, you agree to our <span className="font-semibold">Privacy Policy</span> and that we may
              contact you about your inquiry.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
