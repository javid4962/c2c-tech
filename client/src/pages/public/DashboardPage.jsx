import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import learnerHttp from "../../api/learnerHttp";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useLearnerAuth } from "../../context/LearnerAuthContext";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const StatCard = ({ label, value }) => (
  <div className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-6 shadow-panel">
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{label}</p>
    <p className="mt-3 font-display text-3xl font-bold text-midnight">{value}</p>
  </div>
);

const DashboardPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const { user, logout } = useLearnerAuth();

  const { data, loading, reload } = useAsyncData(async () => {
    const { data } = await learnerHttp.get("/learner-dashboard");
    return data.data;
  }, []);

  if (loading) return <LoadingScreen fullScreen label="Loading dashboard..." variant="dashboard" />;

  const stats = data?.stats || {};
  const enrollments = data?.enrollments || [];
  const certificates = data?.certificates || [];

  const handleProgressBump = async (enrollmentId, current) => {
    const next = Math.min(100, (current || 0) + 10);
    await learnerHttp.patch(`/enrollments/${enrollmentId}/progress`, { progressPercent: next });
    reload?.();
  };

  return (
    <>
      <SEO title={`Dashboard | ${companyName}`} description="Track your enrollments and learning progress." />
      <section className="section-space">
        <div className="page-shell space-y-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Learner dashboard"
              title={`Welcome, ${user?.name || "Learner"}.`}
              description="Track enrollments, progress, and completion status in one place."
            />
            <div className="flex flex-wrap gap-3">
              <Link to="/courses" className="pill-link">
                Browse courses
              </Link>
              <button type="button" onClick={logout} className="pill-link">
                Sign out
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Enrolled" value={stats.enrolled ?? 0} />
            <StatCard label="Active" value={stats.active ?? 0} />
            <StatCard label="Completed" value={stats.completed ?? 0} />
            <StatCard label="Avg progress" value={`${stats.averageProgress ?? 0}%`} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="glass-panel p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Your enrollments</p>
              <div className="mt-6 space-y-4">
                {enrollments.length ? (
                  enrollments.map((enrollment) => (
                    <div
                      key={enrollment._id}
                      className="flex flex-col gap-4 rounded-[18px] border border-slate-200 bg-white p-6 shadow-panel sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-midnight">{enrollment.course?.title}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Status: <span className="font-semibold">{enrollment.status}</span> • Progress:{" "}
                          <span className="font-semibold">{enrollment.progressPercent || 0}%</span>
                        </p>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200/60">
                          <div
                            className="h-full rounded-full bg-slateblue"
                            style={{ width: `${enrollment.progressPercent || 0}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/courses/${enrollment.course?.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slateblue"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleProgressBump(enrollment._id, enrollment.progressPercent)}
                          className="pill-link"
                        >
                          +10% progress
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-6 text-sm text-slate-600 shadow-panel">
                    You don’t have any enrollments yet. Browse courses to get started.
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Certificates</p>
              <div className="mt-6 space-y-4">
                {certificates.length ? (
                  certificates.map((cert) => (
                    <div key={cert._id} className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-6 shadow-panel">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-slateblue" />
                        <div>
                          <p className="font-semibold text-midnight">Certificate issued</p>
                          <p className="mt-1 text-sm text-slate-600">Code: {cert.certificateCode}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Certificates appear after completion where eligible.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;

