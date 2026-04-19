import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-palace.jpg";
import motif from "@/assets/elephant-motif.png";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: yBg }}
      >
        <img
          src={heroImg}
          alt="Royal palace garden with elephants"
          className="h-[120%] w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ivory/20 to-ivory" />
      </motion.div>

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.img
          src={motif}
          alt=""
          className="mb-4 h-16 w-16 opacity-90 md:h-24 md:w-24"
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.p
          className="mb-3 font-display text-[10px] tracking-[0.4em] text-festival-deep md:text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ✦ WEDDING CELEBRATION ✦
        </motion.p>

        <motion.h1
          className="font-script text-6xl leading-none text-gradient-royal md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Mohan Raj
        </motion.h1>

        <motion.div
          className="my-2 flex items-center gap-3 md:my-4 md:gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="h-px w-10 bg-gradient-gold md:w-20" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl text-rose-gold md:text-3xl"
          >
            ❦
          </motion.span>
          <span className="h-px w-10 bg-gradient-gold md:w-20" />
        </motion.div>

        <motion.h1
          className="font-script text-6xl leading-none text-gradient-royal md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Samyuktha
        </motion.h1>

        <motion.p
          className="mt-8 font-serif text-lg italic text-festival-deep md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          27 · May · 2026
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-festival/40 p-1">
          <div className="h-2 w-1 mx-auto rounded-full bg-festival/60" />
        </div>
      </motion.div>
    </section>
  );
}
