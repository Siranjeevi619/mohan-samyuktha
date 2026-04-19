import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Couple } from "@/components/Couple";
import { Details } from "@/components/Details";
import { Gallery } from "@/components/Gallery";
import { ScratchCard } from "@/components/ScratchCard";
import { Invitation } from "@/components/Invitation";
import { Footer } from "@/components/Footer";
import { Petals } from "@/components/Petals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohan Raj ❤ Samyuktha · Wedding Celebration · 27 May 2026" },
      {
        name: "description",
        content:
          "Join us in celebrating the wedding of Mohan Raj & Samyuktha on 27 May 2026 at Atlas Kalai Arangam, Karur.",
      },
      { property: "og:title", content: "Mohan Raj ❤ Samyuktha · 27 May 2026" },
      {
        property: "og:description",
        content: "A royal celebration of love. Save the date — 27 May 2026, Karur.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Petals />
      <Hero />
      <Couple />
      <Details />
      <Gallery />
      <ScratchCard />
      <Invitation />
      <Footer />
    </main>
  );
}
