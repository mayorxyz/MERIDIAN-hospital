/** Full-screen film grain, sits below the custom cursor. */
export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.025]" aria-hidden>
      <svg className="h-full w-full">
        <filter id="site-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-noise)" />
      </svg>
    </div>
  );
}
