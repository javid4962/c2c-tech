import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import BrandMark from "../common/BrandMark";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSite();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="page-shell">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link to="/">
            <BrandMark settings={settings} compact wordmarkOnly />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-semibold ${isActive ? "text-slateblue" : "text-midnight hover:text-slateblue"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/auth"
              className="focus-ring rounded-[12px] bg-midnight px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slateblue hover:shadow-panel"
            >
              Learner Portal
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="focus-ring rounded-2xl border border-slate-200 p-3 text-midnight transition hover:bg-slate-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="page-shell flex flex-col gap-3 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-2 text-sm font-semibold text-midnight hover:bg-[#f4f7fb] hover:text-slateblue"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-[10px] bg-midnight px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Learner Portal
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;
