import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import motif from "@/assets/elephant-motif.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background motifs scroll at different speeds — deep parallax
  const motifLeftY  = useTransform(smooth, [0, 1], ["-10%", "25%"]);
  const motifRightY = useTransform(smooth, [0, 1], ["15%", "-20%"]);
  const motifLeftR  = useTransform(smooth, [0, 1], [-5, 15]);
  const motifRightR = useTransform(smooth, [0, 1], [10, -10]);

  // Invitation card itself floats up smoothly
  const cardY = useTransform(smooth, [0, 0.7], [60, -20]);

  return (
    <section
      id="invitation"
      ref={ref}
      className="relative overflow-hidden bg-gradient-festival py-20 md:py-32"
    >
      {/* ── Parallax background motifs ── */}
      <motion.div
        style={{ y: motifLeftY, rotate: motifLeftR }}
        className="pointer-events-none absolute -left-32 top-0 opacity-10"
        aria-hidden
      >
        <img src={motif} alt="" className="h-[500px] w-[500px]" />
      </motion.div>
      <motion.div
        style={{ y: motifRightY, rotate: motifRightR }}
        className="pointer-events-none absolute -right-32 bottom-0 opacity-10"
        aria-hidden
      >
        <img src={motif} alt="" className="h-[420px] w-[420px]" />
      </motion.div>

      {/* Subtle glow orb behind the card */}
      <motion.div
        style={{ y: useTransform(smooth, [0, 1], ["-5%", "10%"]) }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px]"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-ivory/10 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-6">
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, type: "spring", stiffness: 70 }}
          className="mx-auto max-w-2xl rounded-3xl bg-ivory p-8 shadow-glow gold-border md:p-14"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
            className="text-center"
          >
            <motion.img
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              src={motif}
              alt=""
              className="mx-auto h-20 w-20 md:h-28 md:w-28"
            />

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-4 font-display text-[10px] uppercase tracking-[0.4em] text-rose-gold"
            >
              ✦ WITH THE BLESSINGS OF FAMILY ✦
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="my-6 flex items-center justify-center gap-3"
            >
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </motion.div>

            {/* Tamil */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-lg leading-relaxed text-festival-deep md:text-xl"
            >
              திருமண நல்வாழ்த்து
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-2 font-serif italic text-foreground/70"
            >
              உங்கள் அன்பான வரவேற்கிறோம்
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="my-6 flex items-center justify-center gap-3"
            >
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </motion.div>

            {/* English */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-lg italic text-foreground/80 md:text-xl"
            >
              Together with their families,
              <br />we joyfully invite you to celebrate
              <br />the wedding of
            </motion.p>

            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 pb-2 font-heading text-5xl font-light tracking-tight text-gradient-royal md:text-6xl"
            >
              Mohan Raj
            </motion.h3>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="my-2 font-heading text-2xl text-rose-gold"
            >
              &
            </motion.div>
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="pb-2 font-heading text-5xl font-light tracking-tight text-gradient-royal md:text-6xl"
            >
              Samyuktha
            </motion.h3>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-8 space-y-1 font-serif text-foreground/80"
            >
              <p className="font-display text-xs uppercase tracking-[0.3em] text-festival">
                WEDNESDAY · 27 MAY 2026
              </p>
              <p className="text-lg italic">6:00 PM onwards</p>
              <p className="mt-3 font-serif text-base">
                Atlas Kalai Arangam
                <br />
                <span className="italic text-foreground/60">Karur, Tamil Nadu</span>
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 pb-2 font-script text-2xl text-rose-gold"
            >
              Your presence is our blessing
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
