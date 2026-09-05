import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { containerVariants, cardVariants, EASE } from "../lib/motion";
import { AVATAR_GRADIENTS, initials, nameHash, team, values } from "../lib/data";

/* --------------------------- MANIFESTO ------------------------------ */
function ManifestoBlock() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-clinical px-5 py-32 text-center">
      <div className="blob-bg pointer-events-none absolute inset-0" />
      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] text-white opacity-[0.04]"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M38 0h24v38h38v24H62v38H38V62H0V38h38z" />
      </svg>

      <p className="relative z-10 mb-8 font-mono text-[11px] tracking-[0.3em] text-heal-light">
        SINCE 1983 — OUR ONLY MANDATE
      </p>
      <h1 className="relative z-10 font-display text-[clamp(2.6rem,7vw,5.2rem)] font-black leading-[1.04] tracking-tight text-white">
        <TextReveal text="We built this hospital" delay={0.1} />
        <br />
        <TextReveal text="for one reason." delay={0.35} />
        <br />
        <span className="text-heal-light">
          <TextReveal text="You." delay={0.6} />
        </span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        className="relative z-10 mt-8 max-w-xl text-[16.5px] leading-relaxed text-white/70"
      >
        Founded on the belief that good medicine and human care are not
        separate things — and that a hospital should prove it every single day.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mt-14 flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-white/40"
      >
        <span className="h-px w-12 bg-white/25" />
        SCROLL
        <span className="h-px w-12 bg-white/25" />
      </motion.div>
    </section>
  );
}

/* ------------------------------ STATS ------------------------------- */
function StatsRow() {
  const stats = [
    { value: <AnimatedCounter target={1983} className="font-mono text-[2.6rem] leading-none text-clinical" />, label: "Founded" },
    { value: <AnimatedCounter target={12} className="font-mono text-[2.6rem] leading-none text-clinical" />, label: "Locations" },
    { value: <AnimatedCounter target={4} suffix="M+" className="font-mono text-[2.6rem] leading-none text-clinical" />, label: "Appointments kept" },
    { value: <AnimatedCounter target={23} className="font-mono text-[2.6rem] leading-none text-clinical" />, label: "Care excellence awards" },
  ];
  return (
    <section className="border-b border-line bg-mint">
      <motion.div
        variants={containerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-25%" }}
        className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={cardVariants}
            className={`px-6 py-12 md:px-10 ${i > 0 ? "border-l border-clinical/10" : ""} ${i >= 2 ? "max-lg:border-t max-lg:border-clinical/10" : ""} ${i === 2 ? "max-lg:border-l-0" : ""}`}
          >
            {s.value}
            <p className="mt-2 text-[13px] font-medium text-ink/80">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------- TEAM WALL ----------------------------- */
function TiltCard({ member, index }: { member: (typeof team)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(mx, { stiffness: 100, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    my.set((0.5 - (e.clientY - r.top) / r.height) * 14);
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: (index % 4) * 0.08, duration: 0.6, ease: EASE }}
        data-cursor-label="MEET"
        className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-7 text-center shadow-[0_10px_30px_rgba(26,60,94,0.06)] transition-shadow duration-500 hover:shadow-[0_22px_44px_rgba(26,60,94,0.12)]"
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full font-display text-2xl font-black text-white"
          style={{
            background: AVATAR_GRADIENTS[nameHash(member.name) % AVATAR_GRADIENTS.length],
            transform: "translateZ(28px)",
          }}
          aria-hidden
        >
          {initials(member.name)}
        </div>
        <h3 className="mt-5 font-display text-[16.5px] font-bold text-clinical" style={{ transform: "translateZ(18px)" }}>
          {member.name}
        </h3>
        <p className="mt-1 font-mono text-[10.5px] tracking-[0.14em] text-heal">
          {member.title.toUpperCase()}
        </p>
      </motion.div>
    </div>
  );
}

function TeamWall() {
  return (
    <section className="blob-bg overflow-hidden bg-canvas py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-heal">LEADERSHIP & DEPARTMENT HEADS</p>
        <h2 className="max-w-2xl font-display text-4xl font-black tracking-tight text-clinical md:text-5xl">
          <TextReveal text="120 specialists. One shared purpose." />
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink">
          These are the people accountable for your outcome — names, faces, and
          direct lines. No anonymous departments.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <TiltCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ VALUES ------------------------------ */
function ValuesStrip() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-heal">WHAT WE OPTIMIZE FOR</p>
        <h2 className="mb-14 max-w-2xl font-display text-4xl font-black tracking-tight text-clinical md:text-5xl">
          <TextReveal text="Four words on the wall of every ward." />
        </h2>

        <motion.div
          variants={containerVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="grid gap-x-10 gap-y-14 md:grid-cols-2"
        >
          {values.map((v, i) => (
            <motion.div key={v.name} variants={cardVariants} className="relative overflow-hidden rounded-2xl border border-line bg-canvas p-8 md:p-10">
              <span
                className="pointer-events-none absolute -right-2 -top-7 select-none font-mono text-[7.5rem] font-medium leading-none text-heal opacity-[0.13]"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-display text-[1.9rem] font-black tracking-tight text-clinical">{v.name}</h3>
              <p className="relative mt-3 max-w-md text-[14.5px] leading-relaxed text-ink">{v.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 flex flex-col items-center gap-5 text-center">
          <p className="max-w-md font-display text-2xl font-bold text-clinical">
            The best way to judge us? Come see for yourself.
          </p>
          <Link
            to="/contact"
            data-cursor-label="BOOK"
            className="rounded-full bg-heal px-8 py-4 font-display text-[15px] font-bold text-white transition-colors duration-300 hover:bg-clinical"
          >
            Book a visit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <ManifestoBlock />
      <StatsRow />
      <TeamWall />
      <ValuesStrip />
    </main>
  );
}
