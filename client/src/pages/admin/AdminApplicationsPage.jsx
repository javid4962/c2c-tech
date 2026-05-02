import toast from "react-hot-toast";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const AdminApplicationsPage = () => {
  const { settings } = useSite();
  const { data: applications, loading, setData } = useAsyncData(async () => {
    const { data } = await http.get("/applications");
    return data.data;
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await http.put(`/applications/${id}/status`, { status });
      setData((current) => current.map((item) => (item._id === id ? { ...item, status } : item)));
      toast.success("Application status updated.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status.");
    }
  };

  if (loading) {
    return <LoadingScreen label="Loading applications..." variant="cards" />;
  }

  return (
    <>
      <SEO title={`Applications | ${settings?.companyName} Admin`} description="Review job applications and resume submissions." />
      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Applications</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-midnight">Candidate submissions</h1>
      </div>

      <div className="space-y-5">
        {(applications || []).map((application) => (
          <article key={application._id} className="glass-panel p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-midnight">{application.fullName}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {application.email} • {application.phone || "No phone"} • {application.job?.title || "Role unavailable"}
                </p>
              </div>
              <select
                value={application.status}
                onChange={(event) => updateStatus(application._id, event.target.value)}
                className="rounded-2xl border-slate-200 bg-white text-sm"
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {application.linkedin ? <p className="mt-4 text-sm text-slate-500">LinkedIn: {application.linkedin}</p> : null}
            {application.coverLetter ? <p className="mt-4 text-base leading-8 text-slate-600">{application.coverLetter}</p> : null}
            <a href={application.resume} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
              View Resume
            </a>
          </article>
        ))}
      </div>
    </>
  );
};

export default AdminApplicationsPage;
