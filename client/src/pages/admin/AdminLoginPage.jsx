import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../../components/common/SEO";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { settings } = useSite();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await login(credentials);
      navigate(location.state?.from?.pathname || "/admin/overview", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title={`Admin Login | ${settings?.companyName || "C2C Tech Solutions"}`} description="Secure admin login." />
      <section className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-5xl gap-8 rounded-[36px] bg-white p-6 shadow-soft lg:grid-cols-[1fr_0.92fr] lg:p-10">
          <div className="rounded-[30px] bg-hero-radial p-8 text-white">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-7 w-7 text-aqua" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-aqua">Admin Console</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
              Manage every editable part of the site from one secure workspace.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200">
              Services, blogs, jobs, case studies, contact details, and homepage content are all wired into the dashboard.
            </p>
          </div>

          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Sign In</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-midnight">Administrator Login</h2>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Email</label>
                <input
                  type="email"
                  className="w-full rounded-2xl border-slate-200 bg-white"
                  value={credentials.email}
                  onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-midnight">Password</label>
                <input
                  type="password"
                  className="w-full rounded-2xl border-slate-200 bg-white"
                  value={credentials.password}
                  onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-midnight px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLoginPage;

