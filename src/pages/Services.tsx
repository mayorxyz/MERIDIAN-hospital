import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import { EASE } from "../lib/motion";
import { departments } from "../lib/data";

const organName = ["Heart", "Brain", "Chest & torso", "Whole body", "Joints", "Pelvis"];

/* --------------------------- BODY DIAGRAM --------------------------- */
function BodyDiagram({ active }: { active: number }) {
  const fill = (i: number) => (i === active ? "#2E8B7A" : "#cfe4dd");
  const t = { transition: "fill 0.6s ease, opacity 0.6s ease" } as const;

  return (
    <svg viewBox="0 0 220 400" className="w-full max-w-[240px]" role="img" aria-label={`Body map highlighting ${organName[active]}`}>
      {/* silhouette */}
      <g fill="#E8F4F1" stroke="rgba(26,60,94,0.22)" strokeWidth="1.4">
        <circle cx="110" cy="48" r="25" />
        <rect x="83" y="82" width="54" height="112" rx="26" />
        <path d="M86 98 L60 178" stroke="#dcebe6" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M134 98 L160 178" stroke="#dcebe6" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M97 192 L91 320" stroke="#dcebe6" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M123 192 L129 320" stroke="#dcebe6" strokeWidth="22" strokeLinecap="round" fill="none" />
        <ellipse cx="88" cy="330" rx="13" ry="7" />
        <ellipse cx="132" cy="330" rx="13" ry="7" />
      </g>

      {/* 0 — heart */}
      <path
        d="M106 106c-4-7-15-6-15 3 0 8 9 13 15 19 6-6 15-11 15-19 0-9-11-10-15-3z"
        fill={fill(0)}
        stroke={active === 0 ? "#12304e" : "rgba(26,60,94,0.18)"}
        strokeWidth="1.2"
        style={t}
      />
      {/* 1 — brain */}
      <g style={t}>
        <circle cx="110" cy="46" r="14" fill={fill(1)} stroke={active === 1 ? "#12304e" : "rgba(26,60,94,0.18)"} strokeWidth="1.2" style={t} />
        <path d="M101 46q4.5-7 9 0t9 0" fill="none" stroke={active === 1 ? "#e8f4f1" : "rgba(26,60,94,0.28)"} strokeWidth="1.6" strokeLinecap="round" style={t} />
      </g>
      {/* 2 — chest / torso */}
      <g>
        <ellipse cx="97" cy="122" rx="11" ry="18" fill={fill(2)} stroke={active === 2 ? "#12304e" : "rgba(26,60,94,0.18)"} strokeWidth="1.2" style={t} />
        <ellipse cx="123" cy="122" rx="11" ry="18" fill={fill(2)} stroke={active === 2 ? "#12304e" : "rgba(26,60,94,0.18)"} strokeWidth="1.2" style={t} />
      </g>
      {/* 3 — pediatrics: whole-figure growth ring */}
      <rect
        x="68"
        y="14"
        width="84"
        height="330"
        rx="42"
        fill={active === 3 ? "rgba(46,139,122,0.10)" : "rgba(46,139,122,0)"}
        stroke={active === 3 ? "#2E8B7A" : "rgba(46,139,122,0)"}
        strokeWidth="2"
        strokeDasharray="6 8"
        style={t}
      />
      {/* 4 — joints */}
      <g>
        {[
          [86, 98], [134, 98], [62, 172], [158, 172], [97, 192], [123, 192], [94, 254], [126, 254],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="6"
            fill={fill(4)}
            stroke={active === 4 ? "#12304e" : "rgba(26,60,94,0.18)"}
            strokeWidth="1.2"
            style={t}
          />
        ))}
      </g>
      {/* 5 — pelvis */}
      <ellipse
        cx="110"
        cy="180"
        rx="21"
        ry="14"
        fill={fill(5)}
        stroke={active === 5 ? "#12304e" : "rgba(26,60,94,0.18)"}
        strokeWidth="1.2"
        style={t}
      />
    </svg>
  );
}

/* ------------------------- SCROLL SECTION --------------------------- */
function ScrollSection({
  index,
  onProgress,
}: {
  index: number;
  onProgress: (i: number, distance: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const dept = departments[index];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    onProgress(index, Math.abs(v - 0.5));
  });

  return (
    <section
      ref={ref}
      className="flex min-h-[88vh] items-center border-b border-line py-16 md:min-h-screen md:py-0"
    >
      <div className="grid w-full items-center gap-10 md:grid-cols-[220px_1fr] md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto w-40 md:w-full"
        >
          <BodyDiagram active={index} />
          <p className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] text-ink/60">
            FIG.{String(index + 1).padStart(2, "0")} — {organName[index].toUpperCase()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="border-l-[3px] border-heal pl-6 md:pl-9"
        >
          <p className="font-mono text-[11px] tracking-[0.26em] text-heal">
            {String(index + 1).padStart(2, "0")} / 06 — {dept.name.toUpperCase()}
          </p>
          <h3 className="mt-3 font-display text-3xl font-black tracking-tight text-clinical md:text-[2.6rem] md:leading-[1.05]">
            {dept.tagline}
          </h3>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink">{dept.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {dept.conditions.map((c) => (
              <span key={c} className="rounded-full border border-line bg-canvas px-3.5 py-1.5 font-mono text-[11.5px] text-clinical">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="font-mono text-[22px] text-clinical">{dept.specialists}</p>
              <p className="text-[12px] text-ink/70">specialists</p>
            </div>
            <div>
              <p className="font-mono text-[22px] text-clinical">{dept.wait}</p>
              <p className="text-[12px] text-ink/70">typical wait</p>
            </div>
            <div>
              <p className="font-mono text-[22px] text-clinical">{dept.head.replace("Dr. ", "")}</p>
              <p className="text-[12px] text-ink/70">department head</p>
            </div>
          </div>

          <Link
            to="/doctors"
            data-cursor-label="MEET"
            className="link-grow mt-7 inline-flex items-center gap-2 font-display text-[15px] font-bold text-heal"
          >
            Meet the {dept.name.toLowerCase()} team <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------- STICKY SCROLLYTELLING PAGE --------------------- */
export default function Services() {
  const [active, setActive] = useState(0);
  const progs = useRef<number[]>(Array(departments.length).fill(999));
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const onProgress = (i: number, d: number) => {
    progs.current[i] = d;
    let best = 0;
    for (let k = 1; k < progs.current.length; k++) {
      if (progs.current[k] < progs.current[best]) best = k;
    }
    setActive((prev) => (prev === best ? prev : best));
  };

  const dept = departments[active];

  return (
    <main className="bg-canvas">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 md:px-8 md:pb-16 md:pt-40">
        <p className="mb-5 font-mono text-[11px] tracking-[0.28em] text-heal">SPECIALTIES</p>
        <h1 className="max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.03] tracking-tight text-clinical">
          <TextReveal text="Six departments." />
          <br />
          <span className="text-heal">
            <TextReveal text="One standard of care." delay={0.25} />
          </span>
        </h1>
        <p className="mt-6 hidden max-w-md text-[15.5px] leading-relaxed text-ink md:block">
          Scroll — the body map follows. Every department is staffed by
          board-certified physicians with published outcomes.
        </p>
        <p className="mt-8 hidden items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink/50 md:flex">
          <span className="inline-block h-px w-10 bg-heal" /> SCROLL TO EXPLORE THE MAP
        </p>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col px-5 md:flex-row md:px-8">
        {/* Left sticky panel */}
        <div className="hidden w-[42%] md:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center border-r border-line pr-12">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] tracking-[0.2em] text-heal">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[13px] tracking-[0.2em] text-ink/50">06</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="mt-6 font-display text-[3.4rem] font-black leading-none tracking-tight text-clinical">
                  {dept.name}
                </h2>
                <p className="mt-4 text-[17px] font-semibold text-heal">{dept.tagline}</p>
                <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink">{dept.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-6">
              <Link
                to="/contact"
                data-cursor-label="BOOK"
                className="inline-flex items-center gap-2 rounded-full bg-clinical px-6 py-3 font-display text-[14px] font-bold text-white transition-colors duration-300 hover:bg-heal"
              >
                Book this department <ArrowRight size={16} />
              </Link>
            </div>

            {/* progress ticks */}
            <div className="mt-12 flex gap-2.5">
              {departments.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() =>
                    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                  aria-label={`Go to ${d.name}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-heal" : "w-5 bg-line hover:bg-heal-light"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right scrolling sections */}
        <div className="flex-1 md:pl-14">
          {/* mobile active indicator */}
          <div className="sticky top-[60px] z-20 -mx-5 mb-4 border-y border-line bg-canvas/95 px-5 py-3 backdrop-blur md:hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] tracking-[0.24em] text-heal"
              >
                {String(active + 1).padStart(2, "0")} / 06 — {dept.name.toUpperCase()}
              </motion.p>
            </AnimatePresence>
          </div>

          {departments.map((d, i) => (
            <div
              key={d.id}
              ref={(el) => {
                sectionRefs.current[i] = el?.querySelector("section") ?? el;
              }}
            >
              <ScrollSection index={i} onProgress={onProgress} />
            </div>
          ))}
        </div>
      </div>

      {/* closing strip */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight text-clinical">
              <TextReveal text="Not sure where to start?" />
            </h2>
            <p className="mt-2 text-[15px] text-ink">Our triage nurses will point you to the right specialist — free, over the phone.</p>
          </div>
          <Link
            to="/contact"
            data-cursor-label="CALL"
            className="rounded-full bg-heal px-7 py-3.5 font-display text-[15px] font-bold text-white transition-colors duration-300 hover:bg-clinical"
          >
            Talk to a nurse
          </Link>
        </div>
      </section>
    </main>
  );
}
