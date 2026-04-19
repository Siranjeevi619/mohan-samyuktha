import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import coupleImg from "@/assets/couple-illustration.jpg";

// Smooth spring wrapper for a polished feel
function useSmooth(value: MotionValue<number>) {
  return useSpring(value, { stiffness: 80, damping: 25, restDelta: 0.001 });
}

export function Couple() {
  // The outer container is 300vh tall — this is what gives scroll distance
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSmooth(scrollYProgress);

  // ── Phase 1 (0–40%): Title fades in, cards slide up ──
  const titleOpacity   = useTransform(smoothProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const titleY         = useTransform(smoothProgress, [0, 0.15], [60, 0]);
  const titleScale     = useTransform(smoothProgress, [0.35, 0.5], [1, 0.85]);

  // Groom card — enters from left, exits down-right
  const groomOpacity   = useTransform(smoothProgress, [0.05, 0.25, 0.65, 0.8], [0, 1, 1, 0]);
  const groomX         = useTransform(smoothProgress, [0.05, 0.25], [-120, 0]);
  const groomY         = useTransform(smoothProgress, [0.65, 0.8], [0, 80]);

  // Bride card — enters from right, exits down-left
  const brideOpacity   = useTransform(smoothProgress, [0.1, 0.3, 0.65, 0.8], [0, 1, 1, 0]);
  const brideX         = useTransform(smoothProgress, [0.1, 0.3], [120, 0]);
  const brideY         = useTransform(smoothProgress, [0.65, 0.8], [0, 80]);

  // Centre image — zooms in, stays longest
  const imgOpacity     = useTransform(smoothProgress, [0.2, 0.4, 0.75, 0.9], [0, 1, 1, 0]);
  const imgScale       = useTransform(smoothProgress, [0.2, 0.4], [0.7, 1]);

  // ── Phase 2 (70–100%): Story quote fades & floats in ──
  const storyOpacity   = useTransform(smoothProgress, [0.7, 0.88, 0.95, 1], [0, 1, 1, 0.6]);
  const storyY         = useTransform(smoothProgress, [0.7, 0.88], [60, 0]);

  // Ambient orbs — slow parallax drift at different speeds
  const orbY1          = useTransform(smoothProgress, [0, 1], ["0%", "-35%"]);
  const orbY2          = useTransform(smoothProgress, [0, 1], ["0%", "35%"]);

  return (
    // Outer: 300vh container that provides the scroll distance
    <div
      ref={containerRef}
      id="couple"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* Inner sticky frame: pinned to viewport for the full 300vh scroll */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-royal">

        {/* ─── Ambient background orbs ─── */}
        <motion.div
          style={{ y: orbY1 }}
          className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full"
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-blush/30 via-rose-gold/10 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          style={{ y: orbY2 }}
          className="pointer-events-none absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full"
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-gradient-to-tr from-gold/20 to-transparent blur-3xl" />
        </motion.div>

        {/* ─── Section label + Title ─── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
          className="absolute inset-x-0 top-12 z-20 text-center"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-rose-gold">
            ✦ The Couple ✦
          </p>
          <h2 className="mt-3 font-heading text-5xl font-medium tracking-tight text-gradient-royal md:text-7xl">
            Two Hearts, One Soul
          </h2>
        </motion.div>

        {/* ─── Three-column layout ─── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-3">

            {/* ── Groom Card ── */}
            <motion.div
              style={{ opacity: groomOpacity, x: groomX, y: groomY }}
              className="glass gold-border shadow-card rounded-3xl p-8 text-center"
            >
              {/* Gold pill badge */}
              <div className="mx-auto mb-4 inline-block rounded-full bg-gradient-gold p-[2px]">
                <div className="rounded-full bg-ivory px-6 py-2 font-display text-[9px] uppercase tracking-widest text-festival-deep">
                  Groom
                </div>
              </div>
              <h3 className="pb-1 font-heading text-4xl font-light tracking-tight text-gradient-royal md:text-5xl">
                Mohan Raj
              </h3>
              <p className="mt-1 font-serif text-sm italic text-foreground/60">M. Mohan Raj</p>
              <div className="my-4 mx-auto h-px w-16 bg-gradient-gold" />
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-festival">
                B.Com · FT · MBA
              </p>
            </motion.div>

            {/* ── Centre portrait ── */}
            <motion.div
              style={{ opacity: imgOpacity, scale: imgScale }}
              className="relative flex items-center justify-center"
            >
              {/* Slow-spinning decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {["top", "bottom", "left", "right"].map((pos, i) => (
                  <span
                    key={i}
                    className={`absolute text-xl text-rose-gold/70 ${
                      pos === "top" ? "-top-3 left-1/2 -translate-x-1/2" :
                      pos === "bottom" ? "-bottom-3 left-1/2 -translate-x-1/2" :
                      pos === "left" ? "-left-3 top-1/2 -translate-y-1/2" :
                      "-right-3 top-1/2 -translate-y-1/2"
                    }`}
                  >
                    ❦
                  </span>
                ))}
              </motion.div>

              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full gold-border shadow-glow animate-glow-pulse md:max-w-sm">
                <img
                  src={coupleImg}
                  alt="Bride and groom illustration"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* ── Bride Card ── */}
            <motion.div
              style={{ opacity: brideOpacity, x: brideX, y: brideY }}
              className="glass gold-border shadow-card rounded-3xl p-8 text-center"
            >
              <div className="mx-auto mb-4 inline-block rounded-full bg-gradient-gold p-[2px]">
                <div className="rounded-full bg-ivory px-6 py-2 font-display text-[9px] uppercase tracking-widest text-festival-deep">
                  Bride
                </div>
              </div>
              <h3 className="pb-1 font-heading text-4xl font-light tracking-tight text-gradient-royal md:text-5xl">
                Samyuktha
              </h3>
              <p className="mt-1 font-serif text-sm italic text-foreground/60">A. Samyuktha</p>
              <div className="my-4 mx-auto h-px w-16 bg-gradient-gold" />
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-festival">
                BBA · LLB (Hons.)
              </p>
            </motion.div>
          </div>
        </div>

        {/* ─── Story quote — appears in the final scroll phase ─── */}
        <motion.div
          style={{ opacity: storyOpacity, y: storyY }}
          className="absolute inset-x-0 bottom-16 z-20 px-6 text-center"
        >
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-gold" />
              <span className="text-rose-gold">❦</span>
              <span className="h-px w-12 bg-gradient-gold" />
            </div>
            <p className="font-heading text-2xl font-light tracking-wider text-rose-gold md:text-3xl">
              Our Story
            </p>
            <p className="mt-4 font-serif text-base italic leading-relaxed text-foreground/75 md:text-lg">
              "Two souls, two stories, woven together by destiny — beginning a new
              chapter of love, laughter, and lifelong togetherness."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
