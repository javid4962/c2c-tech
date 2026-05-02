import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const initialApplicationForm = {
  jobId: "",
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  coverLetter: "",
  resumeFile: null,
};

const CareersPage = () => {
  const { settings } = useSite();
  const { data: jobs, loading } = useAsyncData(async () => {
    const { data } = await http.get("/jobs?active=true");
    return data.data;
  }, []);
  const [formState, setFormState] = useState(initialApplicationForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!jobs?.length || formState.jobId) {
      return;
    }

    setFormState((current) => ({ ...current, jobId: jobs[0]._id }));
  }, [jobs, formState.jobId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const payload = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });

      await http.post("/applications", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Application submitted successfully.");
      setFormState({ ...initialApplicationForm, jobId: jobs?.[0]?._id || "" });
      event.target.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen fullScreen label="Loading careers..." variant="form" />;
  }

  return (
    <>
      <SEO
        title={`Careers | ${settings?.companyName}`}
        description="Explore current openings and submit applications with resume upload."
      />
      <section className="section-space">
        <div className="page-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Careers"
              title="Join a team helping enterprises modernize, grow, and scale with confidence."
              description="Job listings are dynamic and managed through the admin dashboard."
            />

            <div className="mt-10 space-y-5">
              {jobs?.map((job) => (
                <article key={job._id} className="glass-panel p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-midnight">{job.title}</h2>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {job.department} • {job.location}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormState((current) => ({ ...current, jobId: job._id }))}
                      className="rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                    >
                      Apply Now
                    </button>
                  </div>
                  <p className="mt-5 text-base leading-8 text-slate-600">{job.summary}</p>
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Responsibilities</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                        {(job.responsibilities || []).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Qualifications</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                        {(job.qualifications || []).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-panel h-fit p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Apply Now</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-midnight">Submit your profile</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Role</label>
                <select
                  value={formState.jobId}
                  onChange={(event) => setFormState((current) => ({ ...current, jobId: event.target.value }))}
                  className="w-full rounded-2xl border-slate-200 bg-white"
                  required
                >
                  {(jobs || []).map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Phone</label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">LinkedIn</label>
                  <input
                    type="url"
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    onChange={(event) => setFormState((current) => ({ ...current, linkedin: event.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Cover Letter</label>
                <textarea
                  rows="5"
                  className="w-full rounded-2xl border-slate-200 bg-white"
                  onChange={(event) => setFormState((current) => ({ ...current, coverLetter: event.target.value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full rounded-2xl border border-dashed border-slate-300 bg-white file:mr-4 file:rounded-full file:border-0 file:bg-midnight file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, resumeFile: event.target.files?.[0] || null }))
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-midnight px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;

