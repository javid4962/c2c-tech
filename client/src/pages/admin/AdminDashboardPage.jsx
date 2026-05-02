import { BriefcaseBusiness, FileStack, Mail, Newspaper } from "lucide-react";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const statCards = [
  { key: "services", label: "Services", icon: BriefcaseBusiness },
  { key: "blogs", label: "Blogs", icon: Newspaper },
  { key: "inquiries", label: "Inquiries", icon: Mail },
  { key: "applications", label: "Applications", icon: FileStack },
];

const AdminDashboardPage = () => {
  const { settings } = useSite();
  const { data, loading } = useAsyncData(async () => {
    const { data } = await http.get("/dashboard");
    return data.data;
  }, []);

  if (loading) {
    return <LoadingScreen label="Loading dashboard analytics..." variant="dashboard" />;
  }

  return (
    <>
      <SEO title={`Admin Dashboard | ${settings?.companyName}`} description="Dashboard analytics and recent activity." />
      <div className="glass-panel p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Overview</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-midnight">Dashboard analytics</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
                <Icon className="h-5 w-5 text-slateblue" />
              </div>
              <p className="mt-4 font-display text-4xl font-bold text-midnight">{data?.totals?.[card.key] || 0}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="glass-panel p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-midnight">Recent inquiries</h2>
          <div className="mt-6 space-y-4">
            {(data?.recentContacts || []).map((contact) => (
              <article key={contact._id} className="rounded-[24px] bg-mist p-5">
                <p className="font-semibold text-midnight">{contact.fullName}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {contact.email} • {contact.serviceInterest || "General inquiry"}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{contact.message}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-midnight">Recent applications</h2>
          <div className="mt-6 space-y-4">
            {(data?.recentApplications || []).map((application) => (
              <article key={application._id} className="rounded-[24px] bg-mist p-5">
                <p className="font-semibold text-midnight">{application.fullName}</p>
                <p className="mt-1 text-sm text-slate-500">{application.job?.title || "Role unavailable"}</p>
                <p className="mt-3 text-sm text-slate-600">{application.email}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;

