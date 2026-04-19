import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import confetti from "canvas-confetti";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const orb1Y = useTransform(smooth, [0, 1], ["-20%", "20%"]);
  const orb2Y = useTransform(smooth, [0, 1], ["20%", "-20%"]);
  const titleY = useTransform(smooth, [0, 0.6], [40, -20]);
  const cardScale = useTransform(smooth, [0.1, 0.5], [0.92, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);

        // Gold scratch surface
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "#d4af6e");
        grad.addColorStop(0.2, "#f3d990");
        grad.addColorStop(0.5, "#ffffff"); // Added a brighter shine
        grad.addColorStop(0.8, "#f3d990");
        grad.addColorStop(1, "#b8884a");
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Texture effect
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < width; i += 4) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "italic 22px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("✦ Scratch to Reveal ✦", width / 2, height / 2);

        ctx.globalCompositeOperation = "destination-out";
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
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
    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
    const ratio = cleared / (data.length / 40);
    if (ratio > 0.45) {
      setRevealed(true);
      fire();
    }
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    
    ctx.beginPath();
    // Correct for DPI and rect offset
    ctx.arc((x - rect.left), (y - rect.top), 30, 0, Math.PI * 2);
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
    <section ref={sectionRef} className="relative overflow-hidden bg-ivory py-20 md:py-32">
      {/* Parallax ambient orbs */}
      <motion.div style={{ y: orb1Y }} className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full" aria-hidden>
        <div className="h-full w-full rounded-full bg-gradient-to-br from-blush/50 to-transparent blur-3xl" />
      </motion.div>
      <motion.div style={{ y: orb2Y }} className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full" aria-hidden>
        <div className="h-full w-full rounded-full bg-gradient-to-tl from-gold/20 to-transparent blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-6 text-center">
        <motion.div style={{ y: titleY }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xs tracking-[0.4em] text-rose-gold uppercase"
          >
            ✦ A SURPRISE FOR YOU ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-3 pb-2 font-script text-5xl text-gradient-royal md:text-7xl"
          >
            Scratch to Reveal
          </motion.h2>
          <p className="mt-3 font-serif italic text-foreground/70">
            Use your finger or cursor to scratch the gold
          </p>
        </motion.div>

        <motion.div style={{ scale: cardScale }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          className="relative mx-auto mt-10 aspect-[3/2] w-full max-w-md overflow-hidden rounded-3xl gold-border shadow-glow bg-gradient-royal"
        >
          {/* Reveal underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="font-display text-[10px] tracking-[0.4em] text-rose-gold">
              ✦ SAVE THE DATE ✦
            </div>
            <div className="mt-3 font-script text-4xl text-gradient-royal md:text-5xl">
              27 May 2026
            </div>
            <div className="mt-2 pb-2 font-script text-3xl text-festival-deep">
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
            className={`absolute inset-0 w-full h-full cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0" : "opacity-100"}`}
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
