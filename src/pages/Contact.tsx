import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock3, Loader2, MapPin, Phone } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import { cardVariants, containerVariants } from "../lib/motion";
import { departments, hours } from "../lib/data";

const inputCls =
  "w-full rounded-lg border border-line bg-canvas px-4 py-3.5 text-[14.5px] text-clinical outline-none transition duration-300 placeholder:text-ink/40 focus:border-heal focus:ring-4 focus:ring-heal/15";
const labelCls = "mb-1.5 block font-mono text-[11px] tracking-[0.16em] text-ink/70";

function useOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun
  const h = now.getHours() + now.getMinutes() / 60;
  if (day === 0) return { open: false, note: "Clinic closed — reopens Monday 7:00" };
  if (day === 6)
    return h >= 8 && h < 14
      ? { open: true, note: "Open now — closes 14:00" }
      : { open: false, note: "Closed — Saturday hours 8:00–14:00" };
  return h >= 7 && h < 19
    ? { open: true, note: "Open now — closes 19:00" }
    : { open: false, note: "Closed — opens 7:00" };
}

/* -------------------------- CONTACT FORM ---------------------------- */
const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  dept: z.string().min(1, "Select a department"),
  message: z.string().min(5, "Tell us briefly what you need"),
});
type FormData = z.infer<typeof schema>;

function AnimatedContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#2E8B7A", "#1A3C5E", "#8FD3C7", "#E8F4F1"],
    });
    setStatus("done");
    reset();
  });

  const fields = [
    { key: "fullName", label: "FULL NAME", node: <input id="ct-fullName" placeholder="Jordan Meyer" className={inputCls} {...register("fullName")} />, error: errors.fullName?.message },
    { key: "email", label: "EMAIL", node: <input id="ct-email" type="email" placeholder="you@email.com" className={inputCls} {...register("email")} />, error: errors.email?.message },
    { key: "phone", label: "PHONE", node: <input id="ct-phone" type="tel" placeholder="(555) 000-0000" className={inputCls} {...register("phone")} />, error: errors.phone?.message },
    {
      key: "dept",
      label: "DEPARTMENT",
      node: (
        <select id="ct-dept" className={`${inputCls} cursor-pointer`} {...register("dept")} defaultValue="">
          <option value="" disabled>Select a department…</option>
          {departments.map((d) => (
            <option key={d.id} value={d.name}>{d.name} — typical wait {d.wait}</option>
          ))}
          <option value="general">Not sure — route me</option>
        </select>
      ),
      error: errors.dept?.message,
    },
    { key: "message", label: "HOW CAN WE HELP?", node: <textarea id="ct-message" rows={4} placeholder="Symptoms, timing, questions — whatever helps." className={`${inputCls} resize-none`} {...register("message")} />, error: errors.message?.message },
  ];

  return (
    <div>
      <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-heal">CONTACT & BOOK</p>
      <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-black leading-[1.05] tracking-tight text-clinical">
        <TextReveal text="Book your appointment." />
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink">
        We pick up. Every time — a coordinator replies within two business hours,
        seven days a week.
      </p>

      {status === "done" ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-12 rounded-2xl border border-heal/30 bg-mint p-8 text-center"
        >
          <CheckCircle2 size={40} className="mx-auto text-heal" />
          <h2 className="mt-4 font-display text-2xl font-black text-clinical">Request received.</h2>
          <p className="mt-2 text-[14.5px] text-ink">
            We'll be in touch within 2 hours. If this is urgent, call the
            emergency line — don't wait on us.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 rounded-full border border-heal px-6 py-2.5 font-display text-[14px] font-bold text-heal transition-colors duration-300 hover:bg-heal hover:text-white"
          >
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={onSubmit}
          noValidate
          variants={containerVariants(0.25)}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-5"
        >
          {fields.map((f) => (
            <motion.div key={f.key} variants={cardVariants} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
              <label htmlFor={`ct-${f.key}`} className={labelCls}>{f.label}</label>
              <div>{f.node}</div>
              {f.error && <p className="mt-1 text-[12px] font-medium text-alert">{f.error}</p>}
            </motion.div>
          ))}
          <motion.div variants={cardVariants}>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-heal py-4 font-display text-[15.5px] font-bold text-white transition-colors duration-300 hover:bg-clinical disabled:cursor-wait disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending your request…
                </>
              ) : (
                "Send Request"
              )}
            </button>
            <p className="mt-3 text-center text-[12px] text-ink/60">
              Prefer to talk? Call <a href="tel:+15550142200" className="font-semibold text-heal">(555) 014-2200</a> — booking line, 7:00–19:00.
            </p>
          </motion.div>
        </motion.form>
      )}
    </div>
  );
}

/* -------------------------- LOCATION PANEL -------------------------- */
function LocationPanel() {
  const openNow = useOpenNow();

  return (
    <aside className="relative flex h-full flex-col overflow-hidden bg-mint">
      <div className="blob-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative z-10 flex flex-1 flex-col gap-9 p-8 md:p-12">
        {/* Address */}
        <div>
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-heal text-white">
              <MapPin size={20} />
            </span>
            <div>
              <h2 className="font-display text-xl font-black text-clinical">Main campus</h2>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink">
                1200 Meridian Way, Harbor District
                <br />
                Free patient parking · Tram stop at the gate
              </p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Clock3 size={16} className="text-heal" />
            <h3 className="font-display text-[15px] font-bold text-clinical">Clinic hours</h3>
            <span
              className={`ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] tracking-wider ${
                openNow.open ? "bg-heal/15 text-heal" : "bg-clinical/10 text-ink/70"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${openNow.open ? "pulse-dot bg-heal" : "bg-ink/50"}`} />
              {openNow.open ? "OPEN NOW" : "CLOSED"}
            </span>
          </div>
          <ul className="divide-y divide-clinical/10 rounded-xl border border-clinical/10 bg-white/60">
            {hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between px-4 py-3">
                <span className="text-[13.5px] font-medium text-clinical">{h.day}</span>
                <span className="font-mono text-[12.5px] text-ink/80">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-ink/65">{openNow.note}</p>
        </div>

        {/* Emergency */}
        <div className="rounded-xl border-2 border-alert/25 bg-white/80 p-5">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-alert" />
            <div>
              <p className="font-display text-[15px] font-black text-clinical">24/7 Emergency line</p>
              <a href="tel:+15550149911" className="font-mono text-[19px] text-alert transition-opacity hover:opacity-75">
                (555) 014-9911
              </a>
            </div>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/75">
            Chest pain, stroke signs, serious injury — call or come straight in.
            We answer every call.
          </p>
        </div>

        {/* Static map */}
        <div className="relative mt-auto h-52 overflow-hidden rounded-xl border border-clinical/15">
          <div className="map-grid absolute inset-0 bg-white/50" />
          <div className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-heal/20" />
          <div className="absolute left-1/3 top-0 h-full w-[3px] bg-heal/15" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="pulse-dot absolute -inset-3 rounded-full bg-heal/25" />
            <svg width="34" height="44" viewBox="0 0 34 44" className="relative drop-shadow-lg" aria-hidden>
              <path d="M17 0C7.6 0 0 7.6 0 17c0 12.7 17 27 17 27s17-14.3 17-27C34 7.6 26.4 0 17 0z" fill="#2E8B7A" />
              <path d="M9 18h3.4l1.7-4.2 3 7.4 1.7-4.2H24" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <p className="absolute bottom-2.5 left-3 font-mono text-[10px] tracking-[0.18em] text-clinical/60">
            40.7128° N — 74.0060° W · HARBOR DISTRICT
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function Contact() {
  return (
    <main className="mx-auto max-w-[96rem]">
      <div className="grid min-h-screen lg:grid-cols-[55%_45%]">
        <div className="px-5 pb-20 pt-32 md:px-12 md:pt-40 lg:px-16">
          <AnimatedContactForm />
        </div>
        <div className="mt-16 lg:mt-0">
          <LocationPanel />
        </div>
      </div>
    </main>
  );
}
