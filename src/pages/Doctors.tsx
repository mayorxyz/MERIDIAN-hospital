import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import { cardExit, cardVariants, containerVariants, EASE, gridSpring } from "../lib/motion";
import { AVATAR_GRADIENTS, departments, doctors, initials, nameHash, type DeptId } from "../lib/data";

type Filter = DeptId | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...departments.map((d) => ({ id: d.id as Filter, label: d.name })),
];

const DoctorCard = forwardRef<HTMLElement, { doc: (typeof doctors)[number] }>(
  function DoctorCard({ doc }, ref) {
  const gradient = AVATAR_GRADIENTS[nameHash(doc.name) % AVATAR_GRADIENTS.length];

  return (
    <motion.article
      ref={ref}
      layout
      layoutId={doc.id}
      variants={cardVariants}
      exit={cardExit}
      transition={{ layout: { type: "spring", ...gridSpring }, duration: 0.6, ease: EASE }}
      data-cursor-label="BOOK"
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow duration-500 hover:shadow-[0_18px_40px_rgba(26,60,94,0.10)]"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-black text-white shadow-inner"
          style={{ background: gradient }}
          aria-hidden
        >
          {initials(doc.name)}
        </div>
        <div>
          <h3 className="font-display text-[17px] font-bold leading-tight text-clinical">
            Dr. {doc.name}
          </h3>
          <p className="mt-0.5 text-[13px] font-medium text-heal">{doc.deptName}</p>
          <p className="font-mono text-[11px] tracking-wider text-ink/60">
            {doc.years} YRS · {doc.focus.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink/60">
          NEW PATIENTS: OPEN
        </span>
        <Link
          to="/contact"
          className="rounded-full border border-heal px-4 py-1.5 font-display text-[13px] font-bold text-heal transition-all duration-300 group-hover:bg-heal group-hover:text-white"
        >
          Book
        </Link>
      </div>
    </motion.article>
  );
});

export default function Doctors() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? doctors : doctors.filter((d) => d.dept === filter);

  return (
    <main className="blob-bg min-h-screen overflow-hidden bg-canvas pb-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <section className="pt-32 md:pt-40">
          <p className="mb-5 font-mono text-[11px] tracking-[0.28em] text-heal">OUR DOCTORS</p>
          <h1 className="max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.03] tracking-tight text-clinical">
            <TextReveal text="Meet the team behind your care." />
          </h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] tracking-[0.16em] text-ink/60">
            <span>120+ SPECIALISTS</span> <span className="text-heal">✚</span>
            <span>6 DEPARTMENTS</span> <span className="text-heal">✚</span>
            <span>4.9 / 5 PATIENT RATING</span>
          </p>
        </section>

        {/* Filter bar */}
        <div className="sticky top-[64px] z-30 -mx-5 mt-12 border-y border-line bg-canvas/95 px-5 py-1 backdrop-blur md:mx-0 md:rounded-full md:border md:px-3">
          <div className="flex gap-1 overflow-x-auto py-2 md:flex-wrap md:justify-center">
            {filters.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 font-sans text-[13.5px] font-medium transition-colors duration-300 ${
                    isActive ? "text-heal" : "text-ink hover:text-clinical"
                  }`}
                >
                  {f.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      transition={{ type: "spring", ...gridSpring }}
                      className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-heal"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Morphing grid */}
        <p className="mb-5 mt-8 font-mono text-[12px] tracking-[0.18em] text-ink/55">
          SHOWING {String(shown.length).padStart(2, "0")} OF {doctors.length} PHYSICIANS
        </p>
        <LayoutGroup>
          <motion.div
            variants={containerVariants(0.05)}
            initial="hidden"
            animate="visible"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((doc) => (
                <DoctorCard key={doc.id} doc={doc} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Recruitment strip */}
        <section className="mt-24 overflow-hidden rounded-2xl bg-clinical">
          <div className="blob-bg flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center md:p-14">
            <div className="relative z-10">
              <p className="font-mono text-[11px] tracking-[0.26em] text-heal-light">FOR PHYSICIANS</p>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white md:text-4xl">
                <TextReveal text="Good doctors deserve a good hospital." />
              </h2>
              <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">
                Research time, modern equipment, and nurses who stay. We're
                hiring across three departments right now.
              </p>
            </div>
            <Link
              to="/contact"
              className="relative z-10 shrink-0 rounded-full bg-heal px-7 py-3.5 font-display text-[15px] font-bold text-white transition-colors duration-300 hover:bg-heal-light hover:text-clinical"
            >
              Join the staff
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
