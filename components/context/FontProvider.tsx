'use client'

import { Open_Sans, Montserrat, Playfair_Display, Lato, Roboto } from 'next/font/google';
import React, { createContext, useContext, useState } from 'react';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ["latin"],
    display: 'swap',
});

const lato = Lato({
    weight: ['400', '700'],
    subsets: ["latin"],
    display: 'swap',
});

const openSans = Open_Sans({
    subsets: ["latin"],
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ["latin"],
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: 'swap',
});

const FontContext = createContext({
    font: playfair,
    fonts: [roboto, lato, openSans, montserrat, playfair] as const,
    fontNames: ['Roboto', 'Lato', 'Open Sans', 'Montserrat', 'Playfair Display'],
    toggleFont: () => { },
});

export const useFont = () => useContext(FontContext);

export function FontProvider({ children }: { children: React.ReactNode }) {
    const [font, setFont] = useState(openSans);
    const fonts = [roboto, lato, openSans, montserrat, playfair] as const;
    const fontNames = ['Roboto', 'Lato', 'Open Sans', 'Montserrat', 'Playfair Display'];

    const toggleFont = () => {
        const currentIndex = fonts.indexOf(font);
        const nextIndex = (currentIndex + 1) % fonts.length;
        setFont(fonts[nextIndex]);
    };


    return (
        <FontContext.Provider value={{ font, fonts, fontNames, toggleFont }}>
            {children}
        </FontContext.Provider>
    );
}
