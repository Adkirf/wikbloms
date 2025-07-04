'use client'

import { Button } from '@/components/ui/button';
import { ArrowRight } from "lucide-react";
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider';

export function CTAButton({ dict, lang }: { dict: Dictionary, lang: string }) {
    const { font } = useFont();

    return (
        <div className={`flex justify-center h-[24vh] items-center ${font.className}`}>
            <Button
                className="
                    h-12
                    border border-primary bg-transparent text-foreground 
                    px-8 py-4 rounded-full text-xl font-bold 
                    hover:bg-secondary hover:scale-105 
                    transition-all duration-300 
                    shadow-lg hover:shadow-xl
                    flex items-center
                "
                onClick={() => window.location.href = `/${lang}/contact`}
            >
                {dict.CTA.contactUs}
                <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
        </div>
    )
}