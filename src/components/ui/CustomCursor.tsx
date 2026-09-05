import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { isTouchDevice } from "../../lib/motion";

/** 16px difference-blend dot; grows with a label over [data-cursor-label] elements. */
export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 });
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"idle" | "link" | "tagged">("idle");

  useEffect(() => {
    if (isTouchDevice()) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const tagged = t.closest<HTMLElement>("[data-cursor-label]");
      if (tagged) {
        setLabel(tagged.dataset.cursorLabel ?? "");
        setMode("tagged");
        return;
      }
      setLabel("");
      const interactive = t.closest("a, button, [role='button'], input, select, textarea, label, summary");
      setMode(interactive ? "link" : "idle");
    };
    const leave = () => setMode("idle");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY }}
      aria-hidden
    >
      <motion.div
        animate={{ scale: mode === "tagged" ? 3.4 : mode === "link" ? 1.9 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.6 }}
        className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <AnimatePresence>
        {mode === "tagged" && label && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-3 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.18em] text-heal"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
