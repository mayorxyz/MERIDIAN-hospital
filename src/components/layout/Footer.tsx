import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { departments } from "../../lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-clinical text-white">
      <div className="blob-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        {/* Emergency strip */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/12 bg-white/5 px-6 py-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-heal-light" />
            <p className="font-display text-lg font-bold">
              Emergency? Don't book — just come.
            </p>
          </div>
          <a
            href="tel:+15550149911"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[15px] font-medium text-clinical transition-colors duration-300 hover:bg-heal-light"
          >
            <Phone size={16} className="text-alert" />
            (555) 014-9911 — 24/7
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-black tracking-tight">MERIDIAN</p>
            <p className="font-mono text-[10px] tracking-[0.28em] text-white/50">GENERAL HOSPITAL</p>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">
              Medicine built around you — 40 years of outcomes we publish, and
              patients who come back by choice.
            </p>
            <p className="mt-5 flex items-start gap-2 text-[13px] text-white/60">
              <MapPin size={15} className="mt-0.5 shrink-0 text-heal-light" />
              1200 Meridian Way, Harbor District
              <br />
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.22em] text-heal-light">DEPARTMENTS</p>
            <ul className="space-y-2.5">
              {departments.map((d) => (
                <li key={d.id}>
                  <Link to="/services" className="text-[14px] text-white/70 transition-colors hover:text-white">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.22em] text-heal-light">PATIENTS</p>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link to="/patient-hub" className="text-white/70 transition-colors hover:text-white">Cost estimator</Link></li>
              <li><Link to="/patient-hub" className="text-white/70 transition-colors hover:text-white">Insurance & billing</Link></li>
              <li><Link to="/doctors" className="text-white/70 transition-colors hover:text-white">Find a doctor</Link></li>
              <li><Link to="/contact" className="text-white/70 transition-colors hover:text-white">Book an appointment</Link></li>
              <li><Link to="/about" className="text-white/70 transition-colors hover:text-white">Our outcomes</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.22em] text-heal-light">HOURS</p>
            <ul className="space-y-2.5 font-mono text-[13px] text-white/70">
              <li className="flex justify-between gap-4"><span>Mon – Fri</span><span>7:00 – 19:00</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>8:00 – 14:00</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>Clinic closed</span></li>
              <li className="flex justify-between gap-4 text-heal-light"><span>Emergency</span><span>24 / 7 / 365</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[12px] text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Meridian General Hospital. All rights reserved.</p>
          <p className="font-mono tracking-wider">JCI ACCREDITED · LEVEL I TRAUMA CENTER · EST. 1983</p>
        </div>
      </div>
    </footer>
  );
}
