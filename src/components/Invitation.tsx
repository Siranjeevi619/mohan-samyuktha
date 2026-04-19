import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import motif from "@/assets/elephant-motif.png";

export function Invitation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="invitation" ref={ref} className="relative overflow-hidden bg-gradient-festival py-20 md:py-32">
      <motion.div
        style={{ y, rotate }}
        className="absolute -right-20 top-10 opacity-10"
      >
        <img src={motif} alt="" className="h-96 w-96" />
      </motion.div>
      <motion.div
        style={{ y, rotate: useTransform(scrollYProgress, [0, 1], [3, -3]) }}
        className="absolute -left-20 bottom-10 opacity-10"
      >
        <img src={motif} alt="" className="h-96 w-96" />
      </motion.div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-2xl rounded-3xl bg-ivory p-8 shadow-glow gold-border md:p-14"
        >
          <div className="text-center">
            <img src={motif} alt="" className="mx-auto h-20 w-20 md:h-28 md:w-28" />

            <p className="mt-4 font-display text-[10px] tracking-[0.4em] text-rose-gold">
              ✦ WITH THE BLESSINGS OF FAMILY ✦
            </p>

            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </div>

            {/* Tamil */}
            <p className="font-serif text-lg leading-relaxed text-festival-deep md:text-xl">
              திருமண நல்வாழ்த்து
            </p>
            <p className="mt-2 font-serif italic text-foreground/70">
              உங்கள் அன்பான வரவேற்கிறோம்
            </p>

            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </div>

            {/* English */}
            <p className="font-serif text-lg italic text-foreground/80 md:text-xl">
              Together with their families,
              <br />we joyfully invite you to celebrate
              <br />the wedding of
            </p>

            <h3 className="mt-6 font-script text-5xl text-gradient-royal md:text-6xl">
              Mohan Raj
            </h3>
            <div className="my-2 font-script text-3xl text-rose-gold">&</div>
            <h3 className="font-script text-5xl text-gradient-royal md:text-6xl">
              Samyuktha
            </h3>

            <div className="mt-8 space-y-1 font-serif text-foreground/80">
              <p className="font-display text-xs tracking-[0.3em] text-festival">
                WEDNESDAY · 27 MAY 2026
              </p>
              <p className="text-lg italic">6:00 PM onwards</p>
              <p className="mt-3 font-serif text-base">
                Atlas Kalai Arangam
                <br />
                <span className="italic text-foreground/60">Karur, Tamil Nadu</span>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </div>

            <p className="mt-6 font-script text-2xl text-rose-gold">
              Your presence is our blessing
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
