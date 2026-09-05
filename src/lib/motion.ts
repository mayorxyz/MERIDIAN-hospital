import type { Variants } from "framer-motion";

/** Primary easing — smooth deceleration, no bounce. */
export const EASE = [0.25, 1, 0.5, 1] as const;

export const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  typeof window !== "undefined" && "ontouchstart" in window;

/** 1. Masked text reveal — clip from below, never an opacity-only fade. */
export const maskVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: "0.4em" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: "0em",
    transition: { duration: 0.8, ease: EASE },
  },
};

/** 2. Staggered container. */
export const containerVariants = (delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

/** 3. Card enter — lift from below. */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** 4. LayoutGroup grid spring. */
export const gridSpring = { stiffness: 80, damping: 20, mass: 1 };

/** 5. Mobile / reduced-motion fallback reveal. */
export const mobileReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: EASE },
} as const;

/** 6. AnimatePresence exit for filtered cards. */
export const cardExit = {
  opacity: 0,
  scale: 0.95,
  transition: { duration: 0.2, ease: "easeOut" as const },
};

/** Page transition wrapper. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeOut" } },
};
