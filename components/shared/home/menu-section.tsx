"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MENU_CATEGORIES = ["A La Carte", "Preorder Special", "Drinks"];

const MENU_ITEMS = [
    {
        category: "A La Carte",
        items: [
            { name: "Smoked Wagyu Brisket", price: "890", desc: "12-hour slow smoked with cherry wood", image: "https://images.unsplash.com/photo-1558030006-4506719337cd?q=80&w=800&auto=format&fit=crop" },
            { name: "Charcoal Grilled River Prawn", price: "1,200", desc: "Served with signature seafood sauce", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" },
            { name: "Lamb Chops", price: "950", desc: "Herb crusted, mint chimichurri", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?q=80&w=800&auto=format&fit=crop" },
            { name: "Wild Mushroom Risotto", price: "450", desc: "Truffle oil, parmesan crisp", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        category: "Preorder Special",
        items: [
            { name: "Whole Suckling Pig", price: "4,500", desc: "Preorder 24hrs in advance. Wood-fired oven roasted.", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=800&auto=format&fit=crop" },
            { name: "Tomahawk Steak (1.5kg)", price: "3,900", desc: "Dry-aged 45 days. Grilled to perfection.", image: "https://images.unsplash.com/photo-1544025162-d7669d26560e?q=80&w=800&auto=format&fit=crop" },
            { name: "Seafood Tower Royale", price: "5,500", desc: "Lobster, oysters, king crab legs, prawns.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        category: "Drinks",
        items: [
            { name: "Signature Smoked Old Fashioned", price: "380", desc: "Bourbon, maple, hickory smoke", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop" },
            { name: "Thai Basil Mojito", price: "320", desc: "Rum, thai basil, lime, soda", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" },
        ]
    }
];

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState("A La Carte");

    const currentItems = MENU_ITEMS.find(c => c.category === activeCategory)?.items || [];

    return (
        <section id="menu" className="py-24 bg-black/20 backdrop-blur-sm relative">
            <div className="container px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Taste the Fire</h2>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">Our Menus</h3>
                    <p className="text-muted-foreground">Curated selection of premium meats and fresh local produce, elevated by the kiss of charcoal.</p>
                </div>

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

                {/* Grid */}
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
                >
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
                </motion.div>
            </div>
        </section>
    );
}
