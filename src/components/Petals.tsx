import { useMemo } from "react";

// Each petal gets one of three neon color themes
const neonPalette = [
  // Rose/Pink — warm neon
  { fill: "oklch(0.82 0.18 350 / 0.9)", glow: "oklch(0.82 0.22 350 / 0.7)", shadow: "rgba(255,105,180, 0.8)" },
  // Gold/Amber — bright champagne neon
  { fill: "oklch(0.88 0.18 70 / 0.9)",  glow: "oklch(0.88 0.22 70 / 0.7)",  shadow: "rgba(255,200,80, 0.8)" },
  // Blush/Mauve — soft violet neon
  { fill: "oklch(0.80 0.14 320 / 0.9)", glow: "oklch(0.80 0.18 320 / 0.7)", shadow: "rgba(220,130,230, 0.7)" },
];

export function Petals({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 9 + Math.random() * 14,
        theme: neonPalette[Math.floor(Math.random() * neonPalette.length)],
        // Subtle random spin per petal
        spin: Math.random() > 0.5 ? 1 : -1,
      })),
    [count]
  );

  return (
    <>
      {/* Inline keyframes for neon petal pulse */}
      <style>{`
        @keyframes neon-pulse {
          0%, 100% { filter: drop-shadow(0 0 4px var(--petal-glow)) drop-shadow(0 0 10px var(--petal-shadow)); }
          50%       { filter: drop-shadow(0 0 8px var(--petal-glow)) drop-shadow(0 0 20px var(--petal-shadow)) brightness(1.2); }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute top-0"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
              // CSS custom props for the neon colours
              ["--petal-glow" as string]: p.theme.glow,
              ["--petal-shadow" as string]: p.theme.shadow,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{
                filter: `drop-shadow(0 0 5px ${p.theme.glow}) drop-shadow(0 0 12px ${p.theme.shadow})`,
                animation: `neon-pulse ${3 + Math.random() * 3}s ease-in-out ${p.delay * 0.3}s infinite`,
              }}
            >
              <path
                d="M12 2c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z"
                fill={p.theme.fill}
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
