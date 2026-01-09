"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import LocationFooter from "@/components/shared/footer/location-footer";
import BookingForm from "@/components/shared/booking/booking-form";
import { BOOKING_CONSTANTS } from "@/lib/constants/booking";

export default function BookTablePage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-foreground font-sans selection:bg-primary/30 selection:text-primary">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-neutral-900 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
                </div>

                <div className="container relative z-10 px-4 text-center text-white mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <span className="block text-primary text-sm tracking-[0.2em] uppercase font-bold mb-2">
                            Reservations
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-serif text-white drop-shadow-xl">
                            {BOOKING_CONSTANTS.title}
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-lg mx-auto font-light leading-relaxed">
                            {BOOKING_CONSTANTS.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="relative z-20 -mt-20 pb-24 px-4">
                <div className="container max-w-4xl mx-auto">
                    <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl">
                        <BookingForm />
                    </div>
                </div>
            </section>

            <LocationFooter />
        </main>
    );
}
