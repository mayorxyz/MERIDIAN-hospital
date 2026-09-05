import { motion } from "framer-motion";
import { containerVariants, maskVariants, reduceMotion } from "../../lib/motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

/** Masked word-by-word reveal: clipPath inset(100% 0 0 0) → inset(0). */
export default function TextReveal({ text, className = "", delay = 0 }: Props) {
  if (reduceMotion()) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.13em] -mb-[0.13em] align-bottom"
        >
          <motion.span className="inline-block will-change-transform" variants={maskVariants} aria-hidden>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
