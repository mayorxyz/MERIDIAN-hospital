import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import confetti from "canvas-confetti";
import { CheckCircle2, ChevronDown, Loader2, ShieldCheck } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { cardVariants, containerVariants, EASE } from "../lib/motion";
import { departments, insurancePlans, type DeptId } from "../lib/data";

const inputCls =
  "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-[14.5px] text-clinical outline-none transition duration-300 placeholder:text-ink/40 focus:border-heal focus:ring-4 focus:ring-heal/15";
const labelCls = "mb-1.5 block font-mono text-[11px] tracking-[0.16em] text-ink/70";

/* ------------------------- COVERAGE SLIDER -------------------------- */
function CoverageSlider() {
  const [dept, setDept] = useState<DeptId>("cardiology");
  const [coverage, setCoverage] = useState(70);
  const [booted, setBooted] = useState(false);

  const base = departments.find((d) => d.id === dept)!.baseCost;
  const est = Math.round((base * (100 - coverage)) / 100);
  const saved = base - est;
  const initialEst = useRef(est);

  useEffect(() => {
    const id = setTimeout(() => setBooted(true), 1600);
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.section
      variants={cardVariants}
      className="rounded-2xl border border-line bg-white p-7 shadow-[0_20px_50px_rgba(26,60,94,0.07)] md:p-10"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-heal">
          <ShieldCheck size={19} />
        </span>
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-clinical">
            <TextReveal text="Estimate your visit cost." />
          </h2>
          <p className="text-[13.5px] text-ink/75">Two inputs. One honest number.</p>
        </div>
      </div>

      {/* Step 1 — department */}
      <div className="mt-9">
        <label htmlFor="dept" className={labelCls}>
          STEP 1 — DEPARTMENT
        </label>
        <select id="dept" value={dept} onChange={(e) => setDept(e.target.value as DeptId)} className={`${inputCls} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%232E8B7A%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E')] bg-[right_1rem_center] bg-no-repeat pr-10`}>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — base ${d.baseCost}
            </option>
          ))}
        </select>
      </div>

      {/* Step 2 — coverage slider */}
      <div className="mt-8">
        <label htmlFor="coverage" className={labelCls}>
          STEP 2 — INSURANCE COVERAGE · <span className="text-heal">{coverage}%</span>
        </label>
        <input
          id="coverage"
          type="range"
          min={0}
          max={100}
          step={5}
          value={coverage}
          onChange={(e) => setCoverage(Number(e.target.value))}
          className="coverage-slider"
          style={{ "--fill": `${coverage}%` } as React.CSSProperties}
          aria-valuetext={`${coverage} percent coverage`}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-[0.18em] text-ink/45">
          <span>SELF-PAY</span>
          <span>FULLY COVERED</span>
        </div>
      </div>

      {/* Live output */}
      <div className="mt-10 rounded-xl bg-clinical px-6 py-7 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/55">YOUR ESTIMATE</p>
        <p className="mt-1 font-mono text-[clamp(2.6rem,6vw,4.2rem)] font-medium leading-none text-white tabular-nums">
          {booted ? (
            <>
              Est. ${est.toLocaleString("en-US")}
            </>
          ) : (
            <>
              Est. $
              <AnimatedCounter target={initialEst.current} className="tabular-nums" />
            </>
          )}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/12 pt-4">
          <p className="text-[14px] font-medium text-heal-light">
            Insurance saves you ${saved.toLocaleString("en-US")}
          </p>
          <p className="font-mono text-[11.5px] tracking-wider text-white/50">
            BASE ${base.toLocaleString("en-US")} · PLAN {coverage}%
          </p>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-ink/60">
        Estimate only. Actual costs vary by plan and treatment — we confirm your
        exact number in writing before any procedure.
      </p>
    </motion.section>
  );
}

/* ----------------------- INSURANCE ACCORDION ------------------------ */
function InsuranceAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section variants={cardVariants} className="rounded-2xl border border-line bg-white p-7 md:p-8">
      <h3 className="font-display text-xl font-black tracking-tight text-clinical">Accepted insurance</h3>
      <p className="mt-1 text-[13px] text-ink/70">Five major plans, verified before you arrive.</p>

      <div className="mt-5 divide-y divide-line">
        {insurancePlans.map((plan, i) => {
          const isOpen = open === i;
          return (
            <div key={plan.name}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span>
                  <span className={`block font-sans text-[14.5px] font-semibold transition-colors ${isOpen ? "text-heal" : "text-clinical"}`}>
                    {plan.name}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink/55">
                    {plan.type.toUpperCase()} · {plan.coverage.toUpperCase()}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-heal transition-transform duration-400 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="rounded-lg bg-mint px-4 py-3.5 text-[13.5px] leading-relaxed text-clinical">
                      {plan.detail}
                    </p>
                    <div className="h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* ------------------------ APPOINTMENT FORM -------------------------- */
const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  dept: z.string().min(1, "Select a department"),
  date: z.string().min(1, "Pick a preferred date"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    confetti({
      particleCount: 150,
      spread: 78,
      origin: { y: 0.65 },
      colors: ["#2E8B7A", "#1A3C5E", "#8FD3C7", "#E8F4F1"],
    });
    setStatus("done");
    reset();
    setTimeout(() => setStatus("idle"), 6000);
  });

  const err = (m?: string) => m && <p className="mt-1 text-[12px] font-medium text-alert">{m}</p>;

  return (
    <motion.section variants={cardVariants} className="rounded-2xl border border-line bg-white p-7 md:p-8">
      <h3 className="font-display text-xl font-black tracking-tight text-clinical">Request an appointment</h3>
      <p className="mt-1 text-[13px] text-ink/70">Replies within 2 business hours.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="ap-name" className={labelCls}>FULL NAME</label>
          <input id="ap-name" placeholder="Jordan Meyer" className={inputCls} {...register("fullName")} />
          {err(errors.fullName?.message)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ap-email" className={labelCls}>EMAIL</label>
            <input id="ap-email" type="email" placeholder="you@email.com" className={inputCls} {...register("email")} />
            {err(errors.email?.message)}
          </div>
          <div>
            <label htmlFor="ap-phone" className={labelCls}>PHONE</label>
            <input id="ap-phone" type="tel" placeholder="(555) 000-0000" className={inputCls} {...register("phone")} />
            {err(errors.phone?.message)}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ap-dept" className={labelCls}>DEPARTMENT</label>
            <select id="ap-dept" className={`${inputCls} cursor-pointer`} {...register("dept")} defaultValue="">
              <option value="" disabled>Select…</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            {err(errors.dept?.message)}
          </div>
          <div>
            <label htmlFor="ap-date" className={labelCls}>PREFERRED DATE</label>
            <input id="ap-date" type="date" className={inputCls} {...register("date")} min={new Date().toISOString().split("T")[0]} />
            {err(errors.date?.message)}
          </div>
        </div>
        <div>
          <label htmlFor="ap-msg" className={labelCls}>ANYTHING WE SHOULD KNOW?</label>
          <textarea id="ap-msg" rows={3} placeholder="Symptoms, referrals, insurance questions…" className={`${inputCls} resize-none`} {...register("message")} />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-heal py-3.5 font-display text-[15px] font-bold text-white transition-colors duration-300 hover:bg-clinical disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="animate-spin" /> Sending…
            </>
          ) : status === "done" ? (
            <>
              <CheckCircle2 size={17} /> Request received
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
        {status === "done" && (
          <p className="text-center text-[13px] font-medium text-heal">
            We'll call you within 2 hours to confirm.
          </p>
        )}
      </form>
    </motion.section>
  );
}

export default function PatientHub() {
  return (
    <main className="blob-bg min-h-screen overflow-hidden bg-canvas pb-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <section className="pt-32 md:pt-40">
          <p className="mb-5 font-mono text-[11px] tracking-[0.28em] text-heal">PATIENT HUB</p>
          <h1 className="max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.03] tracking-tight text-clinical">
            <TextReveal text="No surprises. Just care." />
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink">
            Know your cost before you arrive, check your plan, and request a
            visit — all in under two minutes.
          </p>
        </section>

        <motion.div
          variants={containerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="mt-14 grid gap-7 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <CoverageSlider />
          </div>
          <div className="space-y-7 lg:col-span-2">
            <InsuranceAccordion />
            <AppointmentForm />
          </div>
        </motion.div>

        {/* reassurance strip */}
        <section className="mt-20 grid gap-5 sm:grid-cols-3">
          {[
            { title: "Written price confirmation", text: "Your exact out-of-pocket number, in writing, 48 hours before any procedure." },
            { title: "Billing advocates on staff", text: "Real humans who negotiate with insurers for you. Free, for every patient." },
            { title: "Payment plans from $40/mo", text: "No credit check for essential care. Because illness isn't a credit score." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-line bg-white/70 p-6"
            >
              <p className="font-mono text-[11px] text-heal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-[17px] font-bold text-clinical">{item.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink">{item.text}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
