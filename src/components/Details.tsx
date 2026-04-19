import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";

const cards = [
  { icon: Calendar, label: "DATE", value: "27 May", sub: "2026 · Wednesday" },
  { icon: Clock, label: "TIME", value: "6:00 PM", sub: "to 10:00 PM" },
  { icon: MapPin, label: "VENUE", value: "Atlas Kalai", sub: "Arangam, Karur" },
];

export function Details() {
  return (
    <section id="details" className="relative bg-ivory py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-rose-gold">✦ SAVE THE DATE ✦</p>
          <h2 className="mt-3 font-script text-5xl text-gradient-royal md:text-7xl">
            The Celebration
          </h2>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Countdown />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass gold-border shadow-card hover:shadow-glow rounded-3xl p-8 text-center transition-shadow duration-500"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-festival shadow-gold transition-transform group-hover:scale-110">
                <c.icon className="h-7 w-7 text-ivory" strokeWidth={1.5} />
              </div>
              <div className="font-display text-[10px] tracking-[0.3em] text-rose-gold">
                {c.label}
              </div>
              <div className="mt-3 font-script text-4xl text-gradient-royal">{c.value}</div>
              <div className="mt-2 font-serif italic text-foreground/70">{c.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
