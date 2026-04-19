import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Send } from "lucide-react";
import confetti from "canvas-confetti";

export function RSVP() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#F8C8DC", "#1F7A63", "#d4af6e"],
    });
  };

  return (
    <section id="rsvp" className="relative bg-gradient-royal py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-rose-gold">✦ RSVP ✦</p>
          <h2 className="mt-3 font-script text-5xl text-gradient-royal md:text-7xl">
            Will You Join Us?
          </h2>
          <p className="mt-3 font-serif italic text-foreground/70">
            Kindly respond by 15th May 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-xl rounded-3xl glass gold-border shadow-card p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={submit}
                className="space-y-5"
              >
                <Field label="Your Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-ivory/70 px-4 py-3 font-serif text-foreground outline-none transition focus:border-rose-gold focus:shadow-gold"
                    placeholder="Enter your full name"
                  />
                </Field>
                <Field label="Number of Guests">
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full rounded-xl border border-border bg-ivory/70 px-4 py-3 font-serif text-foreground outline-none transition focus:border-rose-gold focus:shadow-gold"
                  >
                    {["1", "2", "3", "4", "5+"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field label="A Message for the Couple">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-border bg-ivory/70 px-4 py-3 font-serif text-foreground outline-none transition focus:border-rose-gold focus:shadow-gold"
                    placeholder="Share your blessings…"
                  />
                </Field>
                <button
                  type="submit"
                  className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-festival py-4 font-display text-xs tracking-[0.3em] text-ivory shadow-gold transition hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  SEND BLESSINGS
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-festival shadow-gold"
                >
                  <Heart className="h-9 w-9 text-ivory" fill="currentColor" />
                </motion.div>
                <h3 className="font-script text-4xl text-gradient-royal md:text-5xl">
                  Thank You!
                </h3>
                <p className="mt-3 font-serif text-lg italic text-foreground/80">
                  Your blessings are received with love.
                  <br />We can't wait to celebrate with you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[10px] tracking-[0.25em] text-festival-deep">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}
