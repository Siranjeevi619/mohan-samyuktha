import { motion } from "framer-motion";
import coupleImg from "@/assets/couple-illustration.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export function Couple() {
  return (
    <section id="couple" className="relative overflow-hidden bg-gradient-royal py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="font-display text-xs tracking-[0.4em] text-rose-gold">
            ✦ THE COUPLE ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-script text-5xl text-gradient-royal md:text-7xl">
            Two Hearts, One Soul
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-3">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass shadow-card rounded-3xl p-8 text-center gold-border"
          >
            <div className="mx-auto mb-4 inline-block rounded-full bg-gradient-gold p-[2px]">
              <div className="rounded-full bg-ivory px-6 py-2 font-display text-[10px] tracking-widest text-festival-deep">
                GROOM
              </div>
            </div>
            <h3 className="font-script text-5xl text-gradient-royal">Mohan Raj</h3>
            <p className="mt-2 font-serif text-lg italic text-foreground/70">M. Mohan Raj</p>
            <div className="my-4 h-px w-16 mx-auto bg-gradient-gold" />
            <p className="font-display text-xs tracking-[0.25em] text-festival">
              B.Com · FT · MBA
            </p>
          </motion.div>

          {/* Center illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-full gold-border shadow-glow animate-glow-pulse">
              <img
                src={coupleImg}
                alt="Bride and groom illustration"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl text-rose-gold">❦</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl text-rose-gold">❦</div>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-2xl text-rose-gold">❦</div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-2xl text-rose-gold">❦</div>
            </motion.div>
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass shadow-card rounded-3xl p-8 text-center gold-border"
          >
            <div className="mx-auto mb-4 inline-block rounded-full bg-gradient-gold p-[2px]">
              <div className="rounded-full bg-ivory px-6 py-2 font-display text-[10px] tracking-widest text-festival-deep">
                BRIDE
              </div>
            </div>
            <h3 className="font-script text-5xl text-gradient-royal">Samyuktha</h3>
            <p className="mt-2 font-serif text-lg italic text-foreground/70">A. Samyuktha</p>
            <div className="my-4 h-px w-16 mx-auto bg-gradient-gold" />
            <p className="font-display text-xs tracking-[0.25em] text-festival">
              BBA · LLB (Hons.)
            </p>
          </motion.div>
        </div>

        {/* Story timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <p className="font-script text-3xl text-rose-gold md:text-4xl">Our Story</p>
          <p className="mt-4 font-serif text-lg leading-relaxed italic text-foreground/80 md:text-xl">
            "Two souls, two stories, woven together by destiny — beginning a new chapter
            of love, laughter, and lifelong togetherness."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
