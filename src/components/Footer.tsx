import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import motif from "@/assets/elephant-motif.png";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const motifY    = useTransform(smooth, [0, 1], [40, -20]);
  const motifRotate = useTransform(smooth, [0, 1], [-5, 5]);
  const contentY  = useTransform(smooth, [0, 1], [30, -10]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-gradient-festival py-16 text-center text-ivory">
      {/* Parallax motif — floats up as footer scrolls in */}
      <motion.div
        style={{ y: motifY, rotate: motifRotate }}
        className="relative z-10"
      >
        <img src={motif} alt="" className="mx-auto h-20 w-20 opacity-80" />
      </motion.div>

      {/* Content drifts at a slightly slower rate */}
      <motion.div style={{ y: contentY }} className="relative z-10">
        <h3 className="mt-4 pb-2 font-script text-4xl">Mohan Raj ❦ Samyuktha</h3>
        <p className="mt-2 font-display text-[10px] tracking-[0.4em] text-blush uppercase">
          ✦ 27 · MAY · 2026 ✦
        </p>
        <p className="mt-6 font-serif text-sm italic opacity-70">
          Made with love · A celebration of forever
        </p>
        <div className="mt-12 border-t border-ivory/10 pt-8 text-[10px] tracking-[0.2em] opacity-40 uppercase">
          Developed by @CatomDevelopers · Copyright © 2026
        </div>
      </motion.div>

      {/* Ambient glow behind the footer */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[600px] bg-ivory/5 blur-3xl rounded-full" />
      </div>
    </footer>
  );
}
