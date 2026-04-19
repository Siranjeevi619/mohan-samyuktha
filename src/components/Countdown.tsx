import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-05-27T18:00:00+05:30").getTime();

function getDiff() {
  const d = TARGET - Date.now();
  if (d <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    mins: Math.floor((d % 3600000) / 60000),
    secs: Math.floor((d % 60000) / 1000),
  };
}

export function Countdown() {
  const [t, setT] = useState(getDiff());
  useEffect(() => {
    const i = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(i);
  }, []);

  const items: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.mins],
    ["Seconds", t.secs],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {items.map(([label, val], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass gold-border shadow-soft rounded-2xl px-2 py-4 text-center md:px-4 md:py-6"
        >
          <div className="font-serif text-3xl font-semibold text-festival-deep md:text-5xl">
            {String(val).padStart(2, "0")}
          </div>
          <div className="mt-1 font-display text-[9px] tracking-[0.2em] text-rose-gold md:text-xs">
            {label.toUpperCase()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
