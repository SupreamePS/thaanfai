"use client";

import Navbar from "@/components/shared/navbar";
import Hero from "@/components/shared/hero";
import MenuSection from "@/components/shared/home/menu-section";
import FeaturesGrid from "@/components/shared/home/features-grid";
import LocationFooter from "@/components/shared/footer/location-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 font-sans selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Intro Text */}
      <section className="py-24 text-center container px-4">
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-neutral-300">
          "At <span className="text-primary font-semibold">Thaanfai</span>, we don't just grill meat. We master the flame. <br />
          A borderless exploration of flavor, cooked over primal heat."
        </p>
      </section>

      {/* Menu Section */}
      <MenuSection />

      {/* Features (Chef Table, Catering, Events) */}
      <FeaturesGrid />

      {/* Footer / Locations */}
      <LocationFooter />
    </main>
  );
}
