"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Search, Trash2, Calendar, Clock, MapPin, Users, Phone, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type Reservation = {
    id: string;
    timestamp: string;
    branch: string;
    date: string;
    time: string;
    guests: string;
    name: string;
    phone: string;
    email: string;
    status: string;
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Check session on mount
    useEffect(() => {
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
            loadReservations();
        } else {
            setIsLoading(false);
        }
    }, []);

    const loadReservations = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/bookings');
            if (res.ok) {
                const data = await res.json();
                setReservations(data);
            }
        } catch (error) {
            console.error("Failed to load reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "1234") {
            sessionStorage.setItem("admin_auth", "true");
            setIsAuthenticated(true);
            loadReservations();
        } else {
            alert("Invalid PIN");
            setPin("");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        setIsAuthenticated(false);
        setPin("");
    };

    const clearData = () => {
        if (confirm("Are you sure you want to delete all reservation data? This cannot be undone.")) {
            localStorage.removeItem("reservations");
            setReservations([]);
        }
    };

    if (isLoading) return null;

    // LOGIN VIEW
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-neutral-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white">
                            <Lock size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <p className="text-neutral-400">Enter PIN to view reservations</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Entr PIN (1234)"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-lg tracking-widest placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // DASHBOARD VIEW
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-foreground p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Reservations</h1>
                        <p className="text-neutral-400">Manage incoming table bookings</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6">
                        <div className="text-neutral-400 text-sm mb-2">Total Bookings</div>
                        <div className="text-4xl font-bold text-white">{reservations.length}</div>
                    </div>
                    <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6">
                        <div className="text-neutral-400 text-sm mb-2">Liabduan Branch</div>
                        <div className="text-4xl font-bold text-primary">
                            {reservations.filter(r => r.branch === 'liabduan').length}
                        </div>
                    </div>
                    <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6">
                        <div className="text-neutral-400 text-sm mb-2">Rama 9 Branch</div>
                        <div className="text-4xl font-bold text-primary">
                            {reservations.filter(r => r.branch === 'rama9').length}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden">
                    {reservations.length === 0 ? (
                        <div className="p-12 text-center text-neutral-500">
                            No reservations found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-neutral-400 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="p-6 font-medium">Status</th>
                                        <th className="p-6 font-medium">Customer</th>
                                        <th className="p-6 font-medium">Branch</th>
                                        <th className="p-6 font-medium">Reservation Info</th>
                                        <th className="p-6 font-medium">Contact</th>
                                        <th className="p-6 font-medium text-right">Received</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {reservations.map((res) => (
                                        <tr key={res.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 uppercase tracking-wide">
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                                        <User size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">{res.name}</div>
                                                        <div className="text-sm text-neutral-500">{res.guests} Guests</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-neutral-300">
                                                    <MapPin size={16} className="text-primary" />
                                                    <span className="capitalize">{res.branch}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-white">
                                                        <Calendar size={16} className="text-neutral-500" />
                                                        {new Date(res.date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white">
                                                        <Clock size={16} className="text-neutral-500" />
                                                        {res.time}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-2 text-neutral-400">
                                                        <Phone size={14} />
                                                        {res.phone}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-neutral-400">
                                                        <Mail size={14} />
                                                        {res.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right text-sm text-neutral-500">
                                                {new Date(res.timestamp).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
