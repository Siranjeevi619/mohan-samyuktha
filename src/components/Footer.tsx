import motif from "@/assets/elephant-motif.png";

export function Footer() {
  return (
    <footer className="relative bg-gradient-festival py-16 text-center text-ivory">
      <img src={motif} alt="" className="mx-auto h-20 w-20 opacity-80" />
      <h3 className="mt-4 font-script text-4xl">Mohan Raj ❦ Samyuktha</h3>
      <p className="mt-2 font-display text-[10px] tracking-[0.4em] text-blush">
        ✦ 27 · MAY · 2026 ✦
      </p>
      <p className="mt-6 font-serif text-sm italic opacity-70">
        Made with love · A celebration of forever
      </p>
    </footer>
  );
}
