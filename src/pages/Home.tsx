import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Baby,
  Bone,
  Brain,
  ChevronLeft,
  ChevronRight,
  Flower2,
  HeartPulse,
  Ribbon,
} from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import HolographicCard from "../components/ui/HolographicCard";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import MagneticButton from "../components/ui/MagneticButton";
import { cardVariants, containerVariants, EASE, mobileReveal } from "../lib/motion";
import { departments, journeySteps, testimonials } from "../lib/data";

const deptIcons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  cardiology: HeartPulse,
  neurology: Brain,
  oncology: Ribbon,
  pediatrics: Baby,
  orthopedics: Bone,
  womens: Flower2,
};

/* ------------------------------- HERO ------------------------------- */
function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[12px] tabular-nums tracking-widest text-white/70">
      {now.toLocaleTimeString("en-US", { hour12: false })}
    </span>
  );
}

function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(163deg, #10293f 0%, #1a3c5e 44%, #1f5a55 78%, #2e8b7a 125%)",
      }}
    >
      <div className="blob-bg pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[42rem] w-[42rem] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #8fd3c7 0%, transparent 65%)" }}
      />

      {/* Live status rail */}
      <div className="relative z-10 mx-auto mt-24 hidden w-full max-w-7xl items-center justify-between px-8 md:flex">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-heal-light" />
            <span className="font-mono text-[11px] tracking-[0.18em] text-white/85">
              ER OPEN · WAIT 12 MIN
            </span>
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-white/60">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase()}
          </span>
        </div>
        <LiveClock />
      </div>

      {/* Vertical side note */}
      <p className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.4em] text-white/35 lg:block">
        EST. 1983 — 12 LOCATIONS — 40,000+ PATIENTS
      </p>

      {/* ECG line */}
      <svg
        className="pointer-events-none absolute left-0 top-[30%] z-0 w-full opacity-30"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="ecg-path"
          d="M0 60 H160 q12 -20 24 0 H310 l16 -48 l18 92 l16 -44 H520 q12 -20 24 0 H680 l16 -48 l18 92 l16 -44 H880 q12 -20 24 0 H1040 l16 -48 l18 92 l16 -44 H1200"
          fill="none"
          stroke="#8fd3c7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 60 H160 q12 -20 24 0 H310 l16 -48 l18 92 l16 -44 H520 q12 -20 24 0 H680 l16 -48 l18 92 l16 -44 H880 q12 -20 24 0 H1040 l16 -48 l18 92 l16 -44 H1200"
          fill="none"
          stroke="#8fd3c7"
          strokeWidth="1"
          opacity="0.25"
        />
      </svg>

      {/* Headline */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 font-mono text-[11px] tracking-[0.3em] text-heal-light"
        >
          MERIDIAN GENERAL HOSPITAL — HARBOR DISTRICT
        </motion.p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-black leading-[1.02] tracking-tight text-white">
          <TextReveal text="Medicine built around you." delay={0.15} />
          <br />
          <span className="text-heal-light">
            <TextReveal text="Not the other way around." delay={0.45} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[17px]"
        >
          120+ specialists. Same-week appointments. A 12-minute average ER wait.
          Hospital care the way it should have always been.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton to="/contact" variant="solid">
            Book Appointment <ArrowRight size={17} />
          </MagneticButton>
          <MagneticButton to="/services" variant="ghost">
            Our Specialties
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-28 hidden md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <motion.div
              className="h-2 w-1 rounded-full bg-heal-light"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Accreditation marquee */}
      <div className="relative z-10 border-t border-white/12 py-3.5">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 items-center">
            {[...Array(4)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-8 pr-8">
                {[
                  "JCI ACCREDITED",
                  "LEVEL I TRAUMA CENTER",
                  "24/7 EMERGENCY",
                  "SAME-WEEK SPECIALIST APPOINTMENTS",
                  "40,000+ PATIENTS SERVED",
                  "12 LOCATIONS",
                  "EST. 1983",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-8 font-mono text-[11px] tracking-[0.24em] text-white/55">
                    {item} <span className="text-heal-light">✚</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- TRUST STRIP ---------------------------- */
function TrustStrip() {
  const stats = [
    { value: <AnimatedCounter target={40000} suffix="+" className="font-mono text-4xl text-clinical md:text-[2.75rem]" />, label: "Patients treated" },
    { value: <AnimatedCounter target={98} suffix="%" className="font-mono text-4xl text-clinical md:text-[2.75rem]" />, label: "Satisfaction score" },
    { value: <AnimatedCounter target={120} suffix="+" className="font-mono text-4xl text-clinical md:text-[2.75rem]" />, label: "Board-certified specialists" },
    {
      value: (
        <span className="flex items-center gap-2 font-mono text-4xl text-clinical md:text-[2.75rem]">
          24/7 <span className="pulse-dot mt-1 h-2.5 w-2.5 rounded-full bg-heal" />
        </span>
      ),
      label: "Emergency care, always",
    },
  ];
  return (
    <section className="border-b border-line bg-white">
      <motion.div
        variants={containerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={cardVariants}
            className={`px-6 py-10 md:px-10 md:py-14 ${i > 0 ? "border-l border-line" : ""} ${i >= 2 ? "max-lg:border-t max-lg:border-line" : ""} ${i === 2 ? "max-lg:border-l-0" : ""}`}
          >
            {s.value}
            <p className="mt-2 text-[13px] font-medium text-ink/80">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------------- DEPARTMENT GRID -------------------------- */
function DepartmentGrid() {
  return (
    <section className="blob-bg overflow-hidden py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-heal">DEPARTMENTS</p>
            <h2 className="font-display text-4xl font-black tracking-tight text-clinical md:text-5xl">
              <TextReveal text="Expert care in every specialty." />
            </h2>
          </div>
          <Link to="/services" className="link-grow flex w-fit items-center gap-2 font-display text-[15px] font-bold text-heal">
            All six departments <ArrowRight size={17} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {departments.map((d) => {
            const Icon = deptIcons[d.id];
            return (
              <motion.div key={d.id} variants={cardVariants}>
                <Link to="/services" data-cursor-label="VIEW" className="block h-full">
                  <HolographicCard innerClassName="p-7 md:p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-heal">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-clinical">{d.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink">{d.tagline}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-ink/70">
                        WAIT: {d.wait.toUpperCase()}
                      </span>
                      <ArrowRight size={16} className="text-heal" />
                    </div>
                  </HolographicCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------- PATIENT JOURNEY -------------------------- */
function PatientJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  const touch = isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (touch) return;
    setActive(Math.min(journeySteps.length - 1, Math.floor(v * (journeySteps.length + 0.2))));
  });

  const shown = touch ? journeySteps.length - 1 : active;

  return (
    <section className="border-y border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-heal">HOW IT WORKS</p>
        <h2 className="max-w-2xl font-display text-4xl font-black tracking-tight text-clinical md:text-5xl">
          <TextReveal text="From first call to full recovery — we're with you." />
        </h2>

        <div ref={ref} className="mt-20">
          {/* Desktop horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-6 h-[3px] rounded-full bg-line" />
            <motion.div
              className="absolute left-0 right-0 top-6 h-[3px] origin-left rounded-full bg-heal"
              style={{ scaleX: touch ? 1 : scrollYProgress }}
            />
            <div className="relative grid grid-cols-5 gap-6">
              {journeySteps.map((s, i) => (
                <motion.div key={s.step} {...(touch ? mobileReveal : {})}>
                  <motion.div
                    animate={{ scale: i <= shown ? 1 : 0.85 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-[17px] font-black transition-colors duration-500 ${
                      i <= shown ? "border-heal bg-heal text-white" : "border-line bg-canvas text-ink/50"
                    }`}
                  >
                    {i + 1}
                  </motion.div>
                  <h3 className={`mt-5 font-display text-lg font-bold transition-colors duration-500 ${i <= shown ? "text-clinical" : "text-ink/50"}`}>
                    {s.step}
                  </h3>
                  <p className="mt-2 max-w-[190px] text-[13.5px] leading-relaxed text-ink/80">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="relative space-y-10 pl-16 md:hidden">
  <div className="absolute bottom-2 left-6 top-2 w-[3px] rounded-full bg-line" />
  <motion.div
    className="absolute left-6 top-2 w-[3px] origin-top rounded-full bg-heal"
    style={{ scaleY: touch ? 1 : scrollYProgress, height: "calc(100% - 16px)" }}
  />
  {journeySteps.map((s, i) => (
    <motion.div key={s.step} {...mobileReveal} className="relative">
      <div
        className={`absolute -left-16 flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-[17px] font-black transition-colors duration-500 ${
          i <= shown ? "border-heal bg-heal text-white" : "border-line bg-canvas text-ink/50"
        }`}
      >
        {i + 1}
      </div>
      <h3
        className={`pt-1 font-display text-lg font-bold transition-colors duration-500 ${
          i <= shown ? "text-clinical" : "text-ink/50"
        }`}
      >
        {s.step}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink/80">{s.text}</p>
    </motion.div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TESTIMONIALS ---------------------------- */
function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="blob-bg relative overflow-hidden bg-mint py-24 md:py-32">
      <span
        className="pointer-events-none absolute -top-10 left-4 select-none font-display text-[16rem] font-black leading-none text-heal opacity-[0.12] md:left-16"
        aria-hidden
      >
        “
      </span>
      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
        <p className="mb-10 text-center font-mono text-[11px] tracking-[0.28em] text-heal">PATIENT VOICES</p>
        <div className="min-h-[190px] md:min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-center"
            >
              <blockquote className="font-display text-[22px] font-bold leading-snug text-clinical md:text-[28px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="text-[15px] font-semibold text-clinical">{t.name}</span>
                <span className="mx-2 text-heal">·</span>
                <span className="text-[14px] text-ink/75">{t.dept}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-clinical/20 text-clinical transition-all duration-300 hover:border-heal hover:bg-heal hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? "w-7 bg-heal" : "w-1.5 bg-clinical/25 hover:bg-clinical/50"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index + 1) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-clinical/20 text-clinical transition-all duration-300 hover:border-heal hover:bg-heal hover:text-white"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CTA BANNER ---------------------------- */
function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-heal py-24 md:py-28">
      <div className="blob-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-white/70">SAME-DAY APPOINTMENTS AVAILABLE</p>
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,3.8rem)] font-black leading-tight tracking-tight text-white">
          <TextReveal text="Ready to be seen?" />
        </h2>
        <p className="mt-4 max-w-md text-[17px] text-white/85">
          New patients are seen within the week — most within two days.
        </p>
        <div className="mt-9">
          <MagneticButton to="/contact" variant="white">
            Book Now <ArrowRight size={17} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <DepartmentGrid />
      <PatientJourney />
      <Testimonials />
      <CTABanner />
    </main>
  );
}