import toast from "react-hot-toast";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const AdminInboxPage = () => {
  const { settings } = useSite();
  const { data: inquiries, loading, setData } = useAsyncData(async () => {
    const { data } = await http.get("/contacts");
    return data.data;
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await http.put(`/contacts/${id}/status`, { status });
      setData((current) => current.map((item) => (item._id === id ? { ...item, status } : item)));
      toast.success("Inquiry status updated.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status.");
    }
  };

  if (loading) {
    return <LoadingScreen label="Loading inquiries..." variant="cards" />;
  }

  return (
    <>
      <SEO title={`Inquiries | ${settings?.companyName} Admin`} description="Manage contact form submissions." />
      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Inbox</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-midnight">Contact inquiries</h1>
      </div>

      <div className="space-y-5">
        {(inquiries || []).map((inquiry) => (
          <article key={inquiry._id} className="glass-panel p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-midnight">{inquiry.fullName}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {inquiry.email} • {inquiry.phone || "No phone"} • {inquiry.company || "No company"}
                </p>
              </div>
              <select
                value={inquiry.status}
                onChange={(event) => updateStatus(inquiry._id, event.target.value)}
                className="rounded-2xl border-slate-200 bg-white text-sm"
              >
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {inquiry.serviceInterest || "General inquiry"}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">{inquiry.message}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default AdminInboxPage;

