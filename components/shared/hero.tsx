"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder for Grill/Fire Video or Image */}
                <div className="absolute inset-0 bg-neutral-900 bg-[url('https://images.unsplash.com/photo-1544025162-d7669d26560e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
            </div>

            <div className="container relative z-10 px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-primary"
                    >
                        Borderless Grillhouse
                    </motion.p>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                        THAANFAI
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-2xl font-light text-white/80 max-w-2xl mx-auto"
                    >
                        Where modern techniques meet the primal art of charcoal cooking.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="pt-8"
                    >
                        <a href="#menu" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-transparent px-6 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:text-white border border-white/20">
                            <span className="mr-2 text-primary group-hover:text-white transition-colors">Explore Menu</span>
                            <span className="ml-2 transition-transform group-hover:translate-y-1">↓</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle Ember Particles Effect could go here in future */}
        </section>
    );
}
