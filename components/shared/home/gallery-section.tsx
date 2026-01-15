"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
    {
        src: "/images/cheftable.jpg",
        subtitle: "Intimate Dining",
        title: "Chef's Table",
        description: "Experience the fire up close. A 12-course tasting menu prepared right in front of you by our head chef."
    },
    {
        src: "/images/porterhouse.jpg",
        subtitle: "Premium Cuts",
        title: "The Porterhouse",
        description: "Dry-aged for 45 days. Grilled over binchotan charcoal to achieve the perfect crust and tender center."
    },
    {
        src: "/images/thaanfai_rest.jpg",
        subtitle: "Atmosphere",
        title: "Immersive Dining",
        description: "From the roar of the fire to the elegance of our plating. Experience the visual journey of Thaanfai."
    },
    {
        src: "/images/tomahawk.jpg",
        subtitle: "Sharing Plates",
        title: "Tomahawk Feast",
        description: "A show-stopping centerpiece for your gathering. 1.5kg of Australian Wagyu, sliced for sharing."
    },
    {
        src: "/images/catering.jpg",
        subtitle: "Events",
        title: "Private Catering",
        description: "Bring the Thaanfai experience to your home or venue. Full-service charcoal grill catering for any occasion."
    },
];

export default function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentItem = GALLERY_ITEMS[currentIndex];

    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-neutral-900">
            {/* Sliding Background Images */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ x: "100%", opacity: 0.8 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0.8 }}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 }
                    }}
                    className="absolute inset-0 z-0 h-full w-full"
                >
                    <Image
                        src={currentItem.src}
                        alt={currentItem.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="container relative z-10 h-full px-4 mx-auto flex flex-col justify-center">
                <div className="max-w-2xl min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="block text-primary font-bold tracking-widest uppercase mb-4 text-sm">
                                {currentItem.subtitle}
                            </span>
                            <h3 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                {currentItem.title}
                            </h3>
                            <p className="text-neutral-200 text-lg md:text-xl leading-relaxed max-w-lg drop-shadow-lg">
                                {currentItem.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-12 left-4 md:left-auto right-auto md:right-12 flex gap-3 z-20">
                    {GALLERY_ITEMS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-12 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-primary" : "bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
