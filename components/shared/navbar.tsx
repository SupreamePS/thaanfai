"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "#menu" },
        { name: "Experience", href: "#experience" },
        { name: "About", href: "/about" },
        { name: "Locations", href: "#locations" },
    ];

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/80 backdrop-blur-md border-border/20 py-4" : "bg-transparent py-6"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="relative z-50">
                    <span className={cn("text-2xl font-bold tracking-tighter transition-colors", scrolled ? "text-foreground" : "text-white")}>
                        THAANFAI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary tracking-wide",
                                scrolled ? "text-muted-foreground" : "text-white/90"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#reservations"
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
                            "bg-primary text-primary-foreground border border-primary/20",
                            "shadow-[0_0_20px_-5px_var(--color-primary)]/50" // Glowing effect
                        )}
                    >
                        Book a Table
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative z-50 p-2 text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8"
                        initial={{ opacity: 0, y: "-10%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-10%" }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-light hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#reservations"
                            className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Book a Table
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
}
