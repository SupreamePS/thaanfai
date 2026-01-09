"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/constants/home";

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

    const currentItems = MENU_ITEMS.find(c => c.category === activeCategory)?.items || [];

    return (
        <section id="menu" className="py-24 bg-black/20 backdrop-blur-sm relative">
            <div className="container px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Taste the Fire</h2>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">Our Menus</h3>
                    <p className="text-muted-foreground">Curated selection of premium meats and fresh local produce, elevated by the kiss of charcoal.</p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 gap-8 border-b border-border/10 pb-4 overflow-x-auto">
                    {MENU_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "text-lg font-medium transition-all relative px-2 pb-2 whitespace-nowrap",
                                activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid or Big Image */}
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[400px]"
                >
                    {/* Check if current category has a specific menuImage */}
                    {MENU_ITEMS.find(c => c.category === activeCategory && 'menuImage' in c) ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full aspect-[3/4] md:aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900 border border-white/10"
                        >
                            {/* In a real app, ensure this image exists in public/images */}
                            <Image
                                src={MENU_ITEMS.find(c => c.category === activeCategory && 'menuImage' in c)?.menuImage as string}
                                alt="Full Menu"
                                fill
                                className="object-contain" // Contain to show full menu readability
                            />
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            {currentItems.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group flex gap-4 md:gap-6 items-start"
                                >
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0 bg-secondary">
                                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-baseline border-b border-dashed border-border/30 pb-2">
                                            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                                            <span className="text-lg font-semibold text-primary">{item.price}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
