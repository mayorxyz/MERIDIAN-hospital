import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

type Variant = "solid" | "ghost" | "white" | "outline";

interface Props {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  solid:
    "bg-heal text-white hover:bg-heal-light hover:text-clinical border border-heal hover:border-heal-light",
  ghost:
    "border border-white/40 text-white hover:bg-white/10 hover:border-white/70",
  white:
    "bg-white text-heal hover:bg-clinical hover:text-white border border-white",
  outline:
    "border border-heal text-heal hover:bg-heal hover:text-white",
};

/** Spring-loaded button that leans toward the cursor. */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.55 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const btnClass = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-[15px] font-bold tracking-wide transition-colors duration-300 ${variantClass[variant]}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {to ? (
        <Link to={to} className={btnClass}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={btnClass}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={btnClass}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
