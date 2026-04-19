import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

type Cat = "All" | "Pre-wedding" | "Engagement" | "Memories";

const photos: { src: string; cat: Exclude<Cat, "All">; span: string }[] = [
  { src: g1, cat: "Memories", span: "row-span-2" },
  { src: g2, cat: "Engagement", span: "" },
  { src: g3, cat: "Engagement", span: "row-span-2" },
  { src: g4, cat: "Pre-wedding", span: "" },
  { src: g5, cat: "Memories", span: "" },
  { src: g6, cat: "Pre-wedding", span: "" },
];

const cats: Cat[] = ["All", "Pre-wedding", "Engagement", "Memories"];

export function Gallery() {
  const [filter, setFilter] = useState<Cat>("All");
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background parallax — the gradient moves upward as you scroll down
  const bgY = useTransform(smooth, [0, 1], ["0%", "15%"]);
  const headingY = useTransform(smooth, [0, 1], [50, -20]);

  const filtered = photos.filter((p) => filter === "All" || p.cat === filter);

  const next = () => setActive((i) => (i === null ? 0 : (i + 1) % filtered.length));
  const prev = () => setActive((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden bg-gradient-royal py-20 md:py-32">

      {/* Parallax background layer */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-full bg-gradient-to-b from-blush/10 to-transparent" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-gold/10 to-transparent blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Heading parallax */}
        <motion.div style={{ y: headingY }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-display text-xs tracking-[0.4em] text-rose-gold uppercase"
          >
            ✦ MOMENTS ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-3 pb-2 text-center font-script text-5xl text-gradient-royal md:text-7xl"
          >
            Captured Memories
          </motion.h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`btn-shimmer rounded-full px-5 py-2 font-display text-[10px] tracking-[0.25em] transition-all md:text-xs ${
                filter === c
                  ? "bg-gradient-festival text-ivory shadow-gold scale-105"
                  : "glass gold-border text-festival-deep hover:scale-105"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Photo grid — each image has a slight staggered reveal from below */}
        <motion.div
          layout
          className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.src}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.06, type: "spring", stiffness: 100 }}
                onClick={() => setActive(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl gold-border shadow-soft ${p.span}`}
              >
                <motion.img
                  src={p.src}
                  alt={p.cat}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-festival-deep/70 via-transparent to-transparent"
                >
                  <div className="absolute bottom-4 left-4 pb-1 font-script text-2xl text-ivory">
                    {p.cat}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-festival-deep/95 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute right-6 top-6 z-10 rounded-full glass p-3 text-ivory"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute left-4 z-10 rounded-full glass p-3 text-ivory"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute right-4 z-10 rounded-full glass p-3 text-ivory"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight />
            </motion.button>
            <motion.img
              key={filtered[active].src}
              src={filtered[active].src}
              alt=""
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-glow"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
