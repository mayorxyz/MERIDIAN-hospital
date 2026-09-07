import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { EASE } from "../../lib/motion";
import { scrollToTop } from "../ui/SmoothScrollWrapper";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Specialties" },
  { to: "/doctors", label: "Doctors" },
  { to: "/patient-hub", label: "Patient Hub" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Logo({ dark }: { dark: boolean }) {
  const { pathname } = useLocation();
  return (
    <Link
      to="/"
      onClick={() => pathname === "/" && scrollToTop()}
      className="group flex items-center gap-2.5"
      aria-label="Meridian General Hospital — home"
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <rect width="34" height="34" rx="9" className={dark ? "fill-white/10" : "fill-clinical"} />
        <path
          d="M6 18h5.2l2.6-6.4 4.6 10.8 2.6-6.4H28"
          stroke="#2E8B7A"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[17px] font-black tracking-tight ${dark ? "text-white" : "text-clinical"}`}>
          MERIDIAN
        </span>
        <span className={`block font-mono text-[9px] tracking-[0.28em] ${dark ? "text-white/60" : "text-ink/70"}`}>
          GENERAL HOSPITAL
        </span>
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const dark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Always scroll to top when clicking a nav link for the page we're
  // already on (pathname wouldn't change, so nothing would happen).
  const goTo = (to: string) => {
    if (pathname === to) scrollToTop();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          dark
            ? "bg-transparent py-4"
            : "border-b border-line bg-canvas/90 py-3 shadow-[0_1px_20px_rgba(26,60,94,0.06)] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <Logo dark={dark} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => goTo(l.to)}
                className={`link-grow text-[14px] font-medium transition-colors duration-300 ${
                  pathname === l.to
                    ? dark
                      ? "text-heal-light"
                      : "text-heal"
                    : dark
                      ? "text-white/80 hover:text-white"
                      : "text-ink hover:text-clinical"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:+15550149911"
              className={`flex items-center gap-2 font-mono text-[13px] transition-colors ${
                dark ? "text-white/80 hover:text-white" : "text-clinical hover:text-heal"
              }`}
            >
              <Phone size={14} className="text-alert" />
              (555) 014-9911
            </a>
            <Link
              to="/contact"
              onClick={() => goTo("/contact")}
              className="rounded-full bg-heal px-6 py-2.5 font-display text-[14px] font-bold text-white transition-all duration-300 hover:bg-clinical"
            >
              Book Now
            </Link>
          </div>

          <button
            className={`p-1 lg:hidden ${dark ? "text-white" : "text-clinical"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col bg-clinical px-6 pb-10 pt-28 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <div className="blob-bg pointer-events-none absolute inset-0 opacity-60" />
            <nav className="relative flex flex-col gap-1" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    onClick={() => goTo(l.to)}
                    className={`block border-b border-white/10 py-4 font-display text-3xl font-black ${
                      pathname === l.to ? "text-heal-light" : "text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative mt-auto space-y-3"
            >
              <a href="tel:+15550149911" className="flex items-center gap-2 font-mono text-sm text-white/80">
                <Phone size={15} className="text-alert" /> 24/7 Emergency — (555) 014-9911
              </a>
              <Link
                to="/contact"
                onClick={() => goTo("/contact")}
                className="block rounded-full bg-heal py-4 text-center font-display text-lg font-bold text-white"
              >
                Book an Appointment
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
