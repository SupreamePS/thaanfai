"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import { HERO_CONTENT } from "@/lib/constants/home";

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, 300]);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* ... background ... */}

            <div className="container relative z-10 px-4 text-center text-white">
                <motion.div
                    style={{ y: y1 }}
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
                        {HERO_CONTENT.subtitle}
                    </motion.p>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                        {HERO_CONTENT.title}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-2xl font-light text-white/80 max-w-2xl mx-auto"
                    >
                        {HERO_CONTENT.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="pt-8"
                    >
                        <a href="#menu" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-transparent px-6 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:text-white border border-white/20">
                            <span className="mr-2 text-primary group-hover:text-white transition-colors">{HERO_CONTENT.cta}</span>
                            <span className="ml-2 transition-transform group-hover:translate-y-1">↓</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle Ember Particles Effect could go here in future */}
        </section>
    );
}
