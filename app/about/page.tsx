"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import LocationFooter from "@/components/shared/footer/location-footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen text-neutral-100 font-sans">
            <Navbar />

            {/* Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop"
                        alt="Charcoal Embers"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
                </div>
                <div className="container relative z-10 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        Born from fire. Defined by flavor.
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 container px-4 max-w-4xl mx-auto space-y-24">
                {/* Philosophy */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">Borderless Grillhouse</h2>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            Thaanfai disregards culinary borders. We believe that fire is the universal language of food. From Japanese Yakitori techniques to Argentine Asado traditions, we blend methods to create something uniquely ours.
                        </p>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            Our "Borderless" motto isn't just about geography—it's about the freedom to innovate without restriction.
                        </p>
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900">
                        <Image
                            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
                            alt="Chef Cooking"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Charcoal */}
                <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 order-last md:order-first">
                        <Image
                            src="https://images.unsplash.com/photo-1626079986345-42022d103979?q=80&w=800&auto=format&fit=crop"
                            alt="Charcoal Grill"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">The Art of Charcoal</h2>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            We exclusively use binchotan charcoal for its searing heat and clean flavor profile. It allows us to achieve incredibly high temperatures, searing the outside perfectly while locking in the juices.
                        </p>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            Every dish that leaves our kitchen has been kissed by the flame.
                        </p>
                    </div>
                </div>
            </section>

            <LocationFooter />
        </div>
    );
}
