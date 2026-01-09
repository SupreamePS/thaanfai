"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import Hero from "@/components/shared/hero";
import MenuSection from "@/components/shared/home/menu-section";
import FeaturesGrid from "@/components/shared/home/features-grid";
import LocationFooter from "@/components/shared/footer/location-footer";

import { HOME_INTRO } from "@/lib/constants/home";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 font-sans selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Intro Text */}
      <section className="py-24 text-center container px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-neutral-300"
        >
          {HOME_INTRO.text.map((part, i) => (
            typeof part === 'string' ? part : <span key={i} className="text-primary font-semibold">{part.text}</span>
          ))}
        </motion.p>
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
