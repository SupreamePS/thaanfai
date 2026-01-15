"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/constants/home";
import { X } from "lucide-react";

// Types to handle generic structure
type MenuItem = {
    name: string;
    price: string;
    desc: string;
    image: string;
};

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

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
                                    layoutId={`card-${item.name}`}
                                    key={item.name}
                                    onClick={() => setSelectedItem(item as MenuItem)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group flex gap-4 md:gap-6 items-start cursor-pointer"
                                >
                                    <motion.div
                                        layoutId={`image-${item.name}`}
                                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0 bg-secondary"
                                    >
                                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </motion.div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-baseline border-b border-dashed border-border/30 pb-2">
                                            <motion.h4 layoutId={`title-${item.name}`} className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</motion.h4>
                                            <motion.span layoutId={`price-${item.name}`} className="text-lg font-semibold text-primary">{item.price}</motion.span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* MODAL OVERLAY */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            layoutId={`card-${selectedItem.name}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#0F0F14] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <motion.div
                                layoutId={`image-${selectedItem.name}`}
                                className="relative w-full aspect-video"
                            >
                                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] to-transparent" />
                            </motion.div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <motion.h3
                                            layoutId={`title-${selectedItem.name}`}
                                            className="text-3xl font-serif font-bold text-white"
                                        >
                                            {selectedItem.name}
                                        </motion.h3>
                                        <motion.span
                                            layoutId={`price-${selectedItem.name}`}
                                            className="text-2xl font-bold text-primary"
                                        >
                                            {selectedItem.price}
                                        </motion.span>
                                    </div>
                                    <div className="w-16 h-1 bg-primary rounded-full" />
                                </div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-neutral-300 text-lg leading-relaxed"
                                >
                                    {selectedItem.desc}
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
