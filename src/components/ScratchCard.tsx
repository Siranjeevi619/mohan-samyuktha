import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d")!;

    // Gold scratch surface
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#d4af6e");
    grad.addColorStop(0.5, "#f3d990");
    grad.addColorStop(1, "#b8884a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "italic 22px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", canvas.width / 2, canvas.height / 2);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const fire = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#F8C8DC", "#1F7A63", "#d4af6e", "#fff"],
    });
    setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.5 } }), 300);
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
    const ratio = cleared / (data.length / 40);
    if (ratio > 0.45) {
      setRevealed(true);
      const ctx = canvas.getContext("2d")!;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      fire();
    }
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 30, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleStart = (e: React.PointerEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };
  const handleMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };
  const handleEnd = () => {
    isDrawing.current = false;
    checkReveal();
  };

  return (
    <section className="relative bg-ivory py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.4em] text-rose-gold"
        >
          ✦ A SURPRISE FOR YOU ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 font-script text-5xl text-gradient-royal md:text-7xl"
        >
          Scratch to Reveal
        </motion.h2>
        <p className="mt-3 font-serif italic text-foreground/70">
          Use your finger or cursor to scratch the gold
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          className="relative mx-auto mt-10 aspect-[3/2] w-full max-w-md overflow-hidden rounded-3xl gold-border shadow-glow"
        >
          {/* Reveal underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-royal p-6">
            <div className="font-display text-[10px] tracking-[0.4em] text-rose-gold">
              ✦ SAVE THE DATE ✦
            </div>
            <div className="mt-3 font-script text-4xl text-gradient-royal md:text-5xl">
              27 May 2026
            </div>
            <div className="mt-2 font-serif italic text-festival-deep">
              Mohan Raj ❦ Samyuktha
            </div>
            <div className="mt-1 font-display text-[10px] tracking-[0.25em] text-festival">
              ATLAS KALAI ARANGAM · KARUR
            </div>
          </div>
          <canvas
            ref={canvasRef}
            onPointerDown={handleStart}
            onPointerMove={handleMove}
            onPointerUp={handleEnd}
            onPointerLeave={handleEnd}
            className={`absolute inset-0 cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0" : "opacity-100"}`}
          />
        </motion.div>

        {revealed && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={fire}
            className="btn-shimmer mt-6 rounded-full bg-gradient-festival px-8 py-3 font-display text-xs tracking-[0.3em] text-ivory shadow-gold hover:scale-105 transition"
          >
            CELEBRATE AGAIN
          </motion.button>
        )}
      </div>
    </section>
  );
}
