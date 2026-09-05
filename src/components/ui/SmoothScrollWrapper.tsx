import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { isTouchDevice, reduceMotion } from "../../lib/motion";

let lenisInstance: Lenis | null = null;

export function scrollToTop() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Touch devices & reduced-motion users keep native scrolling.
    if (isTouchDevice() || reduceMotion()) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <div>{children}</div>;
}
