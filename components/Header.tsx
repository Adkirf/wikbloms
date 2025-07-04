"use client"

import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useFont } from './context/FontProvider'

//Assets
import { logo, icon_whatsapp, icon_instagram, icon_gmail } from '@/lib/assets'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function Header({ dict, lang }: { dict: Dictionary, lang: string }) {

    const { font } = useFont();



    const socialLinks = [
        { icon: icon_whatsapp, href: `https://wa.me/${dict.footer.phone}`, label: "WhatsApp" },
        { icon: icon_instagram, href: dict.footer.instagram, label: "Instagram" },
        { icon: icon_gmail, href: `mailto:${dict.footer.email}`, label: "Email" }
    ]

    return (
        <header className={`bg-transparent flex h-full justify-center text-black  ${font.className}`}>
            <div className="container  mx-auto px-4 flex flex-col  justify-center items-center">
                {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden order-first text-black hover:text-primary">
                            <Menu size={24} />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className={`w-[300px] sm:w-[400px] bg-background border-r border-border ${font.className}`}>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <nav>
                            <ul className="flex flex-col space-y-4 mt-8">
                                {navItems.map((item, index) => (
                                    <li key={item}>
                                        <Link
                                            href={`/${lang}/${navLinks[index]}`}
                                            className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300 block"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <LanguageSwitcher currentLang={lang} />
                                </li>
                                <li className="flex space-x-4 mt-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <Image
                                                src={social.icon.src}
                                                alt={social.label}
                                                width={24}
                                                height={24}
                                            />
                                        </a>
                                    ))}
                                </li>
                            </ul>
                        </nav>
                    </SheetContent>
                </Sheet> */}


                <div className="fixed top-0 left-0">
                    <Link href={`/${lang}/`} className="flex order-last md:order-first">
                        <Image
                            src={logo.src}
                            alt="Wikblom's Logo"
                            width={175}
                            height={175}
                            className="h-auto w-auto"
                        />
                    </Link>
                </div>

                <nav className="flex flex-col items-center gap-12  justify-between">

                    <div className="flex flex-col w-full gap-8 justify-between items-end md:items-center">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    className='md:hidden'
                                    src={social.icon.src}
                                    alt={social.label}
                                    width={24}
                                    height={24}
                                />
                                <Image
                                    className='hidden md:block'
                                    src={social.icon.src}
                                    alt={social.label}
                                    width={32}
                                    height={32}
                                />
                            </a>
                        ))}
                    </div>
                    <LanguageSwitcher currentLang={lang} />

                </nav>
            </div>
        </header>
    )
}
