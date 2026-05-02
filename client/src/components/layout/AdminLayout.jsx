import { BarChart3, BriefcaseBusiness, FileStack, LogOut, Mail, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";
import BrandMark from "../common/BrandMark";

const adminNav = [
  { label: "Overview", href: "/admin/overview", icon: BarChart3 },
  { label: "Services", href: "/admin/content/services", icon: BriefcaseBusiness },
  { label: "Blogs", href: "/admin/content/blogs", icon: FileStack },
  { label: "Jobs", href: "/admin/content/jobs", icon: BriefcaseBusiness },
  { label: "Case Studies", href: "/admin/content/case-studies", icon: FileStack },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Applications", href: "/admin/applications", icon: BriefcaseBusiness },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const { settings } = useSite();

  return (
    <div className="min-h-screen bg-[#eef3f9]">
      <div className="page-shell py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="glass-panel h-fit p-5">
            <div className="border-b border-slate-200 pb-5">
              <BrandMark settings={settings} compact />
            </div>

            <div className="mt-5 space-y-2">
              {adminNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                        isActive ? "bg-midnight text-white" : "text-slate-600 hover:bg-mist hover:text-midnight"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-mist p-4">
              <p className="text-sm font-semibold text-midnight">{user?.name}</p>
              <p className="mt-1 text-xs text-slate-500">{user?.email}</p>
              <button
                type="button"
                onClick={logout}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-slateblue"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </aside>

          <section className="space-y-6">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
