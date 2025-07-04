'use client'

import { HousePlus, PaintbrushVertical, SquareArrowOutDownLeft, Hammer } from 'lucide-react'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider';

export function WeCover({ dict }: { dict: Dictionary }) {

    const { font } = useFont();

    return (
        <section className={`overflow-auto min-h-[88vh] py-12 md:py-24 lg:py-32 bg-background ${font.className} `}>
            <div className="px-4 md:px-6 max-w-4xl mx-auto relative">
                <div className="flex relative flex-col md:flex-row gap-6 lg:gap-12">
                    <div className="lg:w-auto">
                        <div className="md:aspect-video md:h-full w-full lg:w-[300px] overflow-hidden rounded-xl ">
                            <div className="inset-0 flex h-[75px] md:h-full items-center justify-center">
                                <h1 className="text-center">{dict.weCover.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center space-y-4 text-muted-foreground">
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 mr-4">
                                    <PaintbrushVertical className="h-6 w-6 mt-1 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-foreground">{dict.weCover.service1Title}</h3>
                                    <p className="mt-2 space-y-1 text-muted-foreground">
                                        {dict.weCover.service1Description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 mr-4">
                                    <HousePlus className="h-6 w-6 mt-1 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-foreground">{dict.weCover.service2Title}</h3>
                                    <p className='mt-2 space-y-1 text-muted-foreground'>
                                        {dict.weCover.service2Description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 mr-4">
                                    <SquareArrowOutDownLeft className="h-6 w-6 mt-1 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-foreground">{dict.weCover.service3Title}</h3>
                                    <p className="mt-2 space-y-1 text-muted-foreground">
                                        {dict.weCover.service3Description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 mr-4">
                                    <Hammer className="h-6 w-6 mt-1 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-foreground">{dict.weCover.service4Title}</h3>
                                    <p className="mt-2 space-y-1 text-muted-foreground">
                                        {dict.weCover.service4Description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://calendly.com/kontakt-prietoskompaniet/prietos-consultation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            {dict.CTA.bookConsultation}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
