'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Phone, Mail } from 'lucide-react'
import { useFont } from './context/FontProvider';

import { logo_slogan } from '@/lib/assets';
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function Footer({ dict, lang }: { dict: Dictionary, lang: string }) {

    const { font } = useFont();

    return (
        <footer className={`bg-transparent text-black py-8 ${font.className}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr_1.5fr] gap-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Image
                            src={logo_slogan.src}
                            alt={logo_slogan.alt}
                            width={300}
                            height={300}
                            className="mb-4"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="max-w-xs">
                        <h3 className="text-lg font-semibold mb-4">{dict.footer.contact}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Phone size={18} className="flex-shrink-0 text-accent" />
                                <span>{dict.footer.phone}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} className="flex-shrink-0 text-accent" />
                                <a href="mailto:info@prietos.se" className="hover:text-accent transition-colors">
                                    {dict.footer.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock size={18} className="flex-shrink-0 text-accent" />
                                <span>{dict.footer.openingHours}</span>
                            </li>

                        </ul>
                    </div>



                    {/* Legal Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{dict.footer.legal}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${lang}`} className="hover:text-accent transition-colors">
                                    {dict.footer.termsAndConditions}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/privacy`} className="hover:text-accent transition-colors">
                                    {dict.footer.privacyPolicy}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-accent text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Wikblom&apos;s. {dict.footer.allRightsReserved}
                </div>
            </div>
        </footer>
    )
}
