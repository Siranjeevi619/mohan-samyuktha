import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

  const filtered = photos.filter((p) => filter === "All" || p.cat === filter);

  const next = () => setActive((i) => (i === null ? 0 : (i + 1) % filtered.length));
  const prev = () => setActive((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));

  return (
    <section id="gallery" className="relative bg-gradient-royal py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-rose-gold">✦ MOMENTS ✦</p>
          <h2 className="mt-3 font-script text-5xl text-gradient-royal md:text-7xl">
            Captured Memories
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`btn-shimmer rounded-full px-5 py-2 font-display text-[10px] tracking-[0.25em] transition-all md:text-xs ${
                filter === c
                  ? "bg-gradient-festival text-ivory shadow-gold"
                  : "glass gold-border text-festival-deep hover:scale-105"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActive(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl gold-border shadow-soft ${p.span}`}
              >
                <img
                  src={p.src}
                  alt={p.cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-festival-deep/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 font-script text-2xl text-ivory">
                    {p.cat}
                  </div>
                </div>
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
            <button
              className="absolute right-6 top-6 z-10 rounded-full glass p-3 text-ivory hover:scale-110 transition"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <button
              className="absolute left-4 z-10 rounded-full glass p-3 text-ivory hover:scale-110 transition"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-4 z-10 rounded-full glass p-3 text-ivory hover:scale-110 transition"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight />
            </button>
            <motion.img
              key={filtered[active].src}
              src={filtered[active].src}
              alt=""
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-glow"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
