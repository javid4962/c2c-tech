import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import BrandMark from "../common/BrandMark";

const serviceItems = [
  { label: "IT Training & Placement", href: "/services/it-training-placement" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "IT Staffing", href: "/services/it-staffing" },
  { label: "IT Product Development", href: "/services/it-product-development" },
];

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Our Approach", href: "/#our-approach" },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSite();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);

    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="page-shell">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link to="/">
            <BrandMark settings={settings} compact wordmarkOnly />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <NavLink
              to={navItems[0].href}
              className={({ isActive }) =>
                `text-sm font-semibold ${isActive ? "text-slateblue" : "text-midnight hover:text-slateblue"}`
              }
            >
              {navItems[0].label}
            </NavLink>

            <div className="group relative">
              <NavLink
                to="/services"
                className={() =>
                  `inline-flex items-center gap-1.5 text-sm font-semibold ${
                    location.pathname.startsWith("/services") ? "text-slateblue" : "text-midnight hover:text-slateblue"
                  }`
                }
              >
                Our Services
                <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
              </NavLink>
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-[18px] border border-slate-200 bg-white p-2 shadow-panel">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block rounded-[14px] px-4 py-3 text-sm font-semibold text-midnight hover:bg-mist hover:text-slateblue"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
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
              <Link
                to={navItems[0].href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-midnight hover:bg-[#f4f7fb] hover:text-slateblue"
              >
                {navItems[0].label}
              </Link>
              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-midnight hover:bg-[#f4f7fb] hover:text-slateblue"
              >
                Our Services
              </Link>
              <div className="grid gap-2 border-l border-slate-200 pl-4">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-[#f4f7fb] hover:text-slateblue"
                  >
                    {item.label}
                  </Link>
                  ))}
              </div>
              {navItems.slice(1).map((item) => (
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
