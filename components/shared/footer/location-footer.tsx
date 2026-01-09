"use client";

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { FOOTER_CONTACT, FOOTER_HOURS, FOOTER_LOCATIONS, FOOTER_SOCIALS, FOOTER_EXPLORE } from "@/lib/constants/navigation";
import { APP_DESCRIPTION, APP_NAME, SECTION_HEADERS } from "@/lib/constants";

export default function LocationFooter() {
    return (
        <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-300" id="locations">
            <div className="container px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight text-white">{APP_NAME}</h2>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            {APP_DESCRIPTION}
                        </p>
                        <div className="flex gap-4">
                            {FOOTER_SOCIALS.map((social, idx) => (
                                <a key={idx} href={social.href} className="hover:text-primary transition-colors"><social.icon size={20} /></a>
                            ))}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">{SECTION_HEADERS.locations.findUs}</h3>
                        <div className="space-y-4 text-sm">
                            {FOOTER_LOCATIONS.map((loc) => (
                                <div key={loc.name} className="flex gap-3 items-start">
                                    <MapPin className="text-primary mt-1 shrink-0" size={16} />
                                    <span>
                                        <strong className="block text-white mb-1">{loc.name}</strong>
                                        {loc.addressLines.map(line => <span key={line} className="block">{line}</span>)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Hours */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">{SECTION_HEADERS.locations.contact}</h3>
                        <ul className="space-y-3 text-sm">
                            {FOOTER_CONTACT.map((item) => (
                                <li key={item.value} className="flex items-center gap-3">
                                    <item.icon className="text-primary" size={16} />
                                    <span>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-2 text-sm text-neutral-400">
                            <p><span className="text-white block mb-1">{FOOTER_HOURS.title}</span></p>
                            <p>{FOOTER_HOURS.lunch}</p>
                            <p>{FOOTER_HOURS.dinner}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">{SECTION_HEADERS.locations.explore}</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_EXPLORE.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
