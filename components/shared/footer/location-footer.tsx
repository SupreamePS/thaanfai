"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function LocationFooter() {
    return (
        <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-300" id="locations">
            <div className="container px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight text-white">THAANFAI</h2>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            Borderless grillhouse. Passionate about fire, flavor, and creating unforgettable dining experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Find Us</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-3 items-start">
                                <MapPin className="text-primary mt-1 shrink-0" size={16} />
                                <span>
                                    <strong className="block text-white mb-1">Thonglor Branch</strong>
                                    123 Sukhumvit 55,<br /> Bangkok 10110
                                </span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <MapPin className="text-primary mt-1 shrink-0" size={16} />
                                <span>
                                    <strong className="block text-white mb-1">Sathorn Branch</strong>
                                    45 Sathorn Soi 10,<br /> Bangkok 10500
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Hours */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Contact & Hours</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary" size={16} />
                                <span>+66 2 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary" size={16} />
                                <span>reservations@thaanfai.com</span>
                            </li>
                        </ul>
                        <div className="pt-2 text-sm text-neutral-400">
                            <p><span className="text-white block mb-1">Open Daily</span></p>
                            <p>Lunch: 11:30 - 14:30</p>
                            <p>Dinner: 17:30 - 23:00</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Explore</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#menu" className="hover:text-primary transition-colors">Our Menus</Link></li>
                            <li><Link href="#experience" className="hover:text-primary transition-colors">Chef's Table</Link></li>
                            <li><Link href="#catering" className="hover:text-primary transition-colors">Catering</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()} THAANFAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
