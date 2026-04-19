import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";

const cards = [
  { icon: Calendar, label: "DATE", value: "27 May", sub: "2026 · Wednesday" },
  { icon: Clock, label: "TIME", value: "6:00 PM", sub: "to 10:00 PM" },
  { icon: MapPin, label: "VENUE", value: "Atlas Kalai", sub: "Arangam, Karur" },
];

export function Details() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background orbs parallax — move at different rates
  const orb1Y = useTransform(smooth, [0, 1], ["-20%", "20%"]);
  const orb2Y = useTransform(smooth, [0, 1], ["20%", "-20%"]);

  // Section heading parallax
  const headingY = useTransform(smooth, [0, 1], [40, -40]);

  // Cards stagger reveal — each one slightly offset
  const card0Y = useTransform(smooth, [0, 0.6], [80, 0]);
  const card1Y = useTransform(smooth, [0.05, 0.65], [80, 0]);
  const card2Y = useTransform(smooth, [0.1, 0.7], [80, 0]);

  const cardYs = [card0Y, card1Y, card2Y];

  return (
    <section id="details" ref={ref} className="relative overflow-hidden bg-ivory py-20 md:py-32">

      {/* Parallax ambient orbs */}
      <motion.div
        style={{ y: orb1Y }}
        className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-blush/40 to-transparent blur-3xl" />
      </motion.div>
      <motion.div
        style={{ y: orb2Y }}
        className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-gold/20 to-transparent blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-6">
        {/* Heading with subtle parallax */}
        <motion.div
          style={{ y: headingY }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xs tracking-[0.4em] text-rose-gold uppercase"
          >
            ✦ SAVE THE DATE ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-3 font-heading text-5xl font-medium tracking-tight text-gradient-royal md:text-7xl"
          >
            The Celebration
          </motion.h2>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Countdown />
          </motion.div>
        </div>

        {/* Cards — each one has its own parallax offset */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              style={{ y: cardYs[i] }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, type: "spring" } }}
              className="group glass gold-border shadow-card hover:shadow-glow rounded-3xl p-8 text-center transition-shadow duration-500 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-festival shadow-gold"
              >
                <c.icon className="h-7 w-7 text-ivory" strokeWidth={1.5} />
              </motion.div>
              <div className="font-display text-[10px] tracking-[0.3em] text-rose-gold uppercase">
                {c.label}
              </div>
              <div className="mt-3 pb-1 font-script text-4xl text-gradient-royal">{c.value}</div>
              <div className="mt-2 font-serif italic text-foreground/70">{c.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 mx-auto max-w-4xl overflow-hidden rounded-3xl gold-border shadow-card"
        >
          <iframe
            title="Atlas Kalai Arangam Karur"
            src="https://www.google.com/maps?q=Atlas+Kalai+Arangam+Karur&output=embed"
            className="h-72 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
