import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import { useSite } from "../../context/SiteContext";
import BrandMark from "../common/BrandMark";

const Footer = () => {
  const { settings } = useSite();
  const MailIcon = getIcon("Mail");
  const PhoneIcon = getIcon("Phone");
  const MapIcon = getIcon("MapPinned");
  const industryLinks = (settings?.industries || []).slice(0, 4);
  const quickLinks = settings?.footer?.quickLinks || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Learner Portal", href: "/auth" },
  ];
  const serviceLinks = settings?.footer?.serviceLinks || [];

  return (
    <footer className="border-t border-white/10 bg-[#081630] text-white">
      <div className="page-shell py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr_1fr]">
          <div className="space-y-5">
            <BrandMark settings={settings} wordmarkOnly light compact />
            <p className="max-w-xl text-sm leading-7 text-white/65">
              {settings?.footer?.tagline ||
                "C2C Tech Solutions delivers enterprise modernization, staffing, and growth programs built around measurable execution."}
            </p>
            <div className="flex flex-wrap gap-3">
              {(settings?.socialLinks || []).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/45">Quick Links</p>
            <div className="grid gap-3">
              {quickLinks.map((item) => (
                <Link key={item.href} to={item.href} className="text-sm font-semibold text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/45">Services</p>
            <div className="grid gap-3">
              {serviceLinks.map((item) => (
                <Link key={item.href} to={item.href} className="text-sm font-semibold text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/45">Industries</p>
            <div className="grid gap-3">
              {industryLinks.map((item) => (
                <span key={item.title} className="text-sm font-semibold text-white/70">
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/45">Contact</p>
            <div className="space-y-3 text-sm text-white/65">
              <a href={`mailto:${settings?.contact?.email || ""}`} className="flex items-start gap-3 hover:text-white">
                <MailIcon className="mt-0.5 h-4 w-4 text-aqua" />
                <span>{settings?.contact?.email}</span>
              </a>
              <a href={`tel:${settings?.contact?.phone || ""}`} className="flex items-start gap-3 hover:text-white">
                <PhoneIcon className="mt-0.5 h-4 w-4 text-aqua" />
                <span>{settings?.contact?.phone}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapIcon className="mt-0.5 h-4 w-4 text-aqua" />
                <span>{settings?.contact?.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {settings?.companyName || "C2C Tech Solutions"}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white/70">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
