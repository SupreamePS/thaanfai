"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const FEATURES = [
    {
        id: "experience",
        title: "Chef's Table",
        subtitle: "Intimate Dining",
        description: "Experience the fire up close. A 12-course tasting menu prepared right in front of you by our head chef.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", // Chef cooking
        action: "Reserve Seats"
    },
    {
        id: "catering",
        title: "Catering",
        subtitle: "Private Events",
        description: "Bring the Thaanfai experience to your home or venue. Full-service charcoal grill catering for any occasion.",
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop", // Banquet/Catering
        action: "Inquire Now"
    },
    {
        id: "events",
        title: "Private Events",
        subtitle: "Celebrate with Us",
        description: "Host your celebration at Thaanfai. Private rooms available for groups of 10 to 50 guests.",
        image: "https://images.unsplash.com/photo-1519671482538-5810a2d7031c?q=80&w=800&auto=format&fit=crop", // Party/Event
        action: "Book Room"
    }
];

export default function FeaturesGrid() {
    return (
        <section id="experience" className="py-24 bg-transparent text-white">
            <div className="container px-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative overflow-hidden rounded-2xl bg-black/40 border border-white/10"
                        >
                            {/* Image Background */}
                            <div className="relative h-[400px] w-full">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start space-y-4">
                                <div>
                                    <span className="text-primary text-sm font-bold tracking-widest uppercase">{feature.subtitle}</span>
                                    <h3 className="text-3xl font-bold mt-2 mb-3">{feature.title}</h3>
                                    <p className="text-neutral-300 line-clamp-3 group-hover:line-clamp-none transition-all">
                                        {feature.description}
                                    </p>
                                </div>

                                <button className="flex items-center gap-2 text-white font-semibold group-hover:text-primary transition-colors mt-4">
                                    {feature.action} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
