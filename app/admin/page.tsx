"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Search, Trash2, Calendar as CalendarIcon, Clock, MapPin, Users, Phone, Mail, User, Grid, List as ListIcon, ChevronLeft, ChevronRight, Download, Columns, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

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
    const [viewMode, setViewMode] = useState<"calendar" | "week" | "list">("calendar");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedBranch, setSelectedBranch] = useState<"all" | "liabduan" | "rama9">("all");

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
            const res = await fetch('/api/bookings');
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

    // Stats Logic
    const stats = useMemo(() => {
        const getBranchStats = (branch: string) => {
            const branchRes = reservations.filter(r => r.branch === branch);
            return {
                total: branchRes.length,
                confirmed: branchRes.filter(r => r.status === 'confirmed').length,
                cancelled: branchRes.filter(r => r.status === 'cancelled').length
            };
        };

        return {
            liabduan: getBranchStats('liabduan'),
            rama9: getBranchStats('rama9')
        };
    }, [reservations]);

    // Calendar Days Logic (Month View)
    const calendarDays = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfWeek(endOfMonth(currentDate));
        return eachDayOfInterval({ start, end });
    }, [currentDate]);

    // Weekly Days Logic (Week View)
    const weekDays = useMemo(() => {
        const start = startOfWeek(currentDate);
        const end = endOfWeek(currentDate);
        return eachDayOfInterval({ start, end });
    }, [currentDate]);

    // Filter Logic
    const filteredReservations = useMemo(() => {
        let filtered = reservations;

        // Branch Filter
        if (selectedBranch !== 'all') {
            filtered = filtered.filter(r => r.branch === selectedBranch);
        }

        // Date Filter (from select/click)
        if (selectedDate) {
            filtered = filtered.filter(r => isSameDay(parseISO(r.date), selectedDate));
        }

        // Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(q) ||
                r.email.toLowerCase().includes(q) ||
                r.phone.includes(q)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });

        return filtered;
    }, [selectedDate, reservations, searchQuery, sortOrder, selectedBranch]);

    // Heatmap Logic using Filtered Reservations (to respect branch)
    const maxBookingsInView = useMemo(() => {
        const daysToCheck = viewMode === "week" ? weekDays : calendarDays;
        let max = 0;
        daysToCheck.forEach(day => {
            const count = filteredReservations.filter(r => isSameDay(parseISO(r.date), day)).length;
            if (count > max) max = count;
        });
        return max > 0 ? max : 1;
    }, [viewMode, weekDays, calendarDays, filteredReservations]);

    const getHeatmapColor = (count: number) => {
        if (count === 0) return "bg-neutral-900";
        const intensity = Math.min(count / maxBookingsInView, 1);
        return {
            backgroundColor: `rgba(220, 38, 38, ${Math.max(0.1, intensity * 0.6)})`, // Red with dynamic opacity
            borderColor: `rgba(220, 38, 38, ${Math.max(0.2, intensity)})`
        };
    };

    const getBookingsForDate = (date: Date) => {
        return filteredReservations.filter(r => isSameDay(parseISO(r.date), date));
    };

    const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

    // Handlers
    const nextPeriod = () => {
        if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
        else setCurrentDate(addMonths(currentDate, 1));
    };
    const prevPeriod = () => {
        if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
        else setCurrentDate(subMonths(currentDate, 1));
    };
    const handleDateClick = (date: Date) => {
        setSelectedDate(isSameDay(date, selectedDate || new Date(0)) ? null : date);
        setViewMode("list"); // Switch to list to see details
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Liabduan Stats */}
                    <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MapPin size={48} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Liabduan Branch</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-white">{stats.liabduan.total}</div>
                                <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Total</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-500">{stats.liabduan.confirmed}</div>
                                <div className="text-xs text-green-500/70 mt-1 uppercase tracking-wider">Confirmed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-red-500">{stats.liabduan.cancelled}</div>
                                <div className="text-xs text-red-500/70 mt-1 uppercase tracking-wider">Cancelled</div>
                            </div>
                        </div>
                    </div>

                    {/* Rama 9 Stats */}
                    <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MapPin size={48} className="text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Rama 9 Branch</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-white">{stats.rama9.total}</div>
                                <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Total</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-500">{stats.rama9.confirmed}</div>
                                <div className="text-xs text-green-500/70 mt-1 uppercase tracking-wider">Confirmed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-red-500">{stats.rama9.cancelled}</div>
                                <div className="text-xs text-red-500/70 mt-1 uppercase tracking-wider">Cancelled</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4 items-center w-full">

                        {/* Branch Filter */}
                        <div className="flex bg-neutral-900/50 border border-white/10 p-1 rounded-lg w-fit shrink-0">
                            {['all', 'liabduan', 'rama9'].map((branch) => (
                                <button
                                    key={branch}
                                    onClick={() => setSelectedBranch(branch as any)}
                                    className={cn(
                                        "px-4 py-2 rounded-md transition-all text-sm font-medium capitalize",
                                        selectedBranch === branch
                                            ? "bg-primary text-black shadow-lg"
                                            : "text-neutral-400 hover:text-white"
                                    )}
                                >
                                    {branch === 'all' ? 'All Branches' : branch}
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-px bg-white/10 hidden md:block" />
                        <div className="flex bg-neutral-900/50 border border-white/10 p-1 rounded-lg w-fit shrink-0">
                            <button
                                onClick={() => setViewMode("calendar")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                                    viewMode === "calendar" ? "bg-white/10 text-white shadow-lg" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                <CalendarIcon size={16} />
                                Month
                            </button>
                            <button
                                onClick={() => setViewMode("week")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                                    viewMode === "week" ? "bg-white/10 text-white shadow-lg" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                <Columns size={16} />
                                Week
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                                    viewMode === "list" ? "bg-white/10 text-white shadow-lg" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                <ListIcon size={16} />
                                List
                            </button>
                        </div>

                        {(viewMode === "calendar" || viewMode === "week") && (
                            <div className="flex items-center gap-4 bg-neutral-900/50 border border-white/10 px-4 py-2 rounded-lg">
                                <button onClick={prevPeriod} className="text-neutral-400 hover:text-white transition-colors">
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-white font-medium min-w-[120px] text-center">
                                    {viewMode === 'calendar' ? format(currentDate, "MMMM yyyy") : `Week of ${format(startOfWeek(currentDate), "MMM d")}`}
                                </span>
                                <button onClick={nextPeriod} className="text-neutral-400 hover:text-white transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* List View Controls (Search & Sort) */}
                        {viewMode === 'list' && (
                            <div className="flex flex-1 items-center gap-2 w-full md:w-auto">
                                <div className="relative flex-1 md:max-w-xs">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search name, phone..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                                <button
                                    onClick={toggleSort}
                                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors text-sm"
                                >
                                    <ArrowUpDown size={16} />
                                    {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                                </button>
                                {selectedDate && (
                                    <div className="flex items-center gap-2 text-white bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg text-sm shrink-0">
                                        <span>{format(selectedDate, "MMM dd")}</span>
                                        <button onClick={() => setSelectedDate(null)} className="hover:text-primary transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {viewMode === "calendar" && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-neutral-900/30 border border-white/5 rounded-2xl p-6"
                        >
                            <div className="grid grid-cols-7 gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="bg-neutral-900 p-4 text-center text-sm font-medium text-neutral-500">
                                        {day}
                                    </div>
                                ))}
                                {calendarDays.map((day, i) => {
                                    const bookings = getBookingsForDate(day);
                                    const isCurrentMonth = isSameMonth(day, currentDate);
                                    const isTodayDate = isToday(day);
                                    const hasBookings = bookings.length > 0;
                                    const heatmapStyle = hasBookings ? getHeatmapColor(bookings.length) : {};

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => handleDateClick(day)}
                                            style={heatmapStyle}
                                            className={cn(
                                                "bg-neutral-900 min-h-[120px] p-3 transition-colors cursor-pointer hover:brightness-110",
                                                !isCurrentMonth && "opacity-30 pointer-events-none"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={cn(
                                                    "w-7 h-7 flex items-center justify-center rounded-full text-sm",
                                                    isTodayDate ? "bg-white text-black font-bold" : "text-neutral-400"
                                                )}>
                                                    {format(day, 'd')}
                                                </span>
                                                {hasBookings && (
                                                    <span className="text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded-full">
                                                        {bookings.length}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                {bookings.slice(0, 3).map(booking => (
                                                    <div key={booking.id} className="text-[10px] truncate bg-black/40 text-white px-1.5 py-0.5 rounded border border-white/10">
                                                        {booking.time} - {booking.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {viewMode === "week" && (
                        <motion.div
                            key="week"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-neutral-900/30 border border-white/5 rounded-2xl p-6 overflow-x-auto"
                        >
                            <div className="grid grid-cols-7 gap-4 min-w-[800px]">
                                {weekDays.map((day, i) => {
                                    const bookings = getBookingsForDate(day);
                                    const isTodayDate = isToday(day);
                                    const heatmapStyle = bookings.length > 0 ? getHeatmapColor(bookings.length) : {};

                                    return (
                                        <div key={i} className="flex flex-col gap-3">
                                            {/* Header Card */}
                                            <div
                                                style={heatmapStyle}
                                                onClick={() => handleDateClick(day)}
                                                className={cn(
                                                    "p-4 rounded-xl border border-white/10 text-center cursor-pointer transition-transform hover:scale-[1.02]",
                                                    "bg-neutral-900" // Fallback bg is handled by style
                                                )}
                                            >
                                                <div className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-1">
                                                    {format(day, 'EEE')}
                                                </div>
                                                <div className={cn(
                                                    "text-2xl font-bold",
                                                    isTodayDate ? "text-white" : "text-neutral-200"
                                                )}>
                                                    {format(day, 'd')}
                                                </div>
                                                <div className="mt-2 text-xs font-semibold bg-black/30 text-white py-1 px-2 rounded-lg inline-block">
                                                    {bookings.length} Bookings
                                                </div>
                                            </div>

                                            {/* Scrollable list of bookings for the day */}
                                            <div className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                {bookings.map(booking => (
                                                    <div key={booking.id} className="bg-neutral-900 border border-white/10 p-3 rounded-lg text-sm hover:border-primary/50 transition-colors">
                                                        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-primary">
                                                            <Clock size={12} />
                                                            {booking.time}
                                                        </div>
                                                        <div className="font-semibold text-white truncate">{booking.name}</div>
                                                        <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                                                            <Users size={12} />
                                                            {booking.guests} Guests
                                                        </div>
                                                        <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                                                            <span className={cn(
                                                                "w-2 h-2 rounded-full",
                                                                booking.status === 'confirmed' ? "bg-green-500" :
                                                                    booking.status === 'cancelled' ? "bg-red-500" :
                                                                        "bg-yellow-500"
                                                            )} />
                                                            {booking.status}
                                                        </div>
                                                    </div>
                                                ))}
                                                {bookings.length === 0 && (
                                                    <div className="text-center text-neutral-600 text-xs py-4 italic">
                                                        No bookings
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {viewMode === "list" && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden"
                        >
                            {filteredReservations.length === 0 ? (
                                <div className="p-12 text-center text-neutral-500">
                                    No reservations found matching your criteria.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 text-neutral-400 text-sm uppercase tracking-wider">
                                            <tr>
                                                <th className="p-6 font-medium">Status</th>
                                                <th className="p-6 font-medium">Customer</th>
                                                <th className="p-6 font-medium">Branch</th>
                                                <th className="p-6 font-medium">Date & Time</th>
                                                <th className="p-6 font-medium">Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredReservations.map((res) => (
                                                <tr key={res.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-6">
                                                        <span className={cn(
                                                            "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                                                            res.status === 'confirmed' ? "bg-green-500/20 text-green-400" :
                                                                res.status === 'cancelled' ? "bg-red-500/20 text-red-400" :
                                                                    "bg-yellow-500/20 text-yellow-400"
                                                        )}>
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
                                                                <CalendarIcon size={16} className="text-neutral-500" />
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
