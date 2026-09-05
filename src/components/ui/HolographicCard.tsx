import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../../lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/** Card with animated conic-gradient border on hover (@property --holo-angle). */
export default function HolographicCard({ children, className = "", innerClassName = "" }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`holo-card ${className}`}
    >
      <div
        className={`relative z-[1] h-full rounded-[16px] border border-line bg-canvas transition-colors duration-500 hover:border-transparent ${innerClassName}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
