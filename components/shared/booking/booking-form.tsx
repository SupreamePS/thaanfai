"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BOOKING_CONSTANTS } from "@/lib/constants/booking";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Calendar as CalendarIcon, Clock, Users, MapPin } from "lucide-react";

export default function BookingForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        branch: "",
        date: "",
        time: "",
        guests: "",
        name: "",
        phone: "",
        email: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                console.error("Failed to submit booking");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
        }
    };

    const inputClasses = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all";
    const labelClasses = "block text-sm font-medium text-neutral-300 mb-1.5 ml-1";

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center max-w-md mx-auto"
            >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{BOOKING_CONSTANTS.successMessage.title}</h3>
                <p className="text-neutral-300 mb-6">{BOOKING_CONSTANTS.successMessage.description}</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:text-white transition-colors underline underline-offset-4"
                >
                    Make another reservation
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8">
            {/* Branch Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BOOKING_CONSTANTS.branches.map((branch) => (
                    <label
                        key={branch.id}
                        className={cn(
                            "cursor-pointer relative p-4 rounded-xl border transition-all duration-300",
                            formData.branch === branch.id
                                ? "bg-primary/10 border-primary"
                                : "bg-black/40 border-white/10 hover:border-white/30"
                        )}
                    >
                        <input
                            type="radio"
                            name="branch"
                            value={branch.id}
                            checked={formData.branch === branch.id}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                            className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
                            required
                        />
                        <div className="flex items-center gap-3">
                            <MapPin className={formData.branch === branch.id ? "text-primary" : "text-neutral-500"} size={20} />
                            <div>
                                <div className={cn("font-semibold", formData.branch === branch.id ? "text-primary" : "text-white")}>
                                    {branch.name}
                                </div>
                                <div className="text-xs text-neutral-400">{branch.address}</div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className={labelClasses}>{BOOKING_CONSTANTS.labels.date}</label>
                    <div className="relative">
                        <input
                            type="date"
                            required
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={18} />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>{BOOKING_CONSTANTS.labels.time}</label>
                    <div className="relative">
                        <select
                            required
                            className={cn(inputClasses, "appearance-none")}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Time</option>
                            {BOOKING_CONSTANTS.timeSlots.map(time => (
                                <option key={time} value={time} className="bg-neutral-900">{time}</option>
                            ))}
                        </select>
                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={18} />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>{BOOKING_CONSTANTS.labels.guests}</label>
                    <div className="relative">
                        <select
                            required
                            className={cn(inputClasses, "appearance-none")}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            defaultValue=""
                        >
                            <option value="" disabled>Guests</option>
                            {BOOKING_CONSTANTS.partySizes.map(size => (
                                <option key={size} value={size} className="bg-neutral-900">{size} {size === 1 ? 'Person' : 'People'}</option>
                            ))}
                        </select>
                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={18} />
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>{BOOKING_CONSTANTS.labels.name}</label>
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>{BOOKING_CONSTANTS.labels.phone}</label>
                        <input
                            type="tel"
                            required
                            placeholder="08X XXX XXXX"
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClasses}>{BOOKING_CONSTANTS.labels.email}</label>
                    <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className={inputClasses}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-black font-bold py-4 rounded-full hover:bg-white transition-colors text-lg shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-white/20 mt-8"
            >
                {BOOKING_CONSTANTS.labels.submit}
            </button>
        </form>
    );
}
