import { useMemo } from "react";

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 8 + Math.random() * 14,
        hue: Math.random() > 0.5 ? "350" : "30",
      })),
    [count]
  );

  return (
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
          }}
        >
          <svg viewBox="0 0 24 24" fill={`oklch(0.85 0.08 ${p.hue} / 0.85)`}>
            <path d="M12 2c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
