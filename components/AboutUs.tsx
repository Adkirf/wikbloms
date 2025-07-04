'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { useInView } from 'react-intersection-observer'

import { about1, about2, about3 } from '@/lib/assets'
import videoSrc from '@/public/assets/videohomprieto.mp4'
import { useFont } from './context/FontProvider'


export function AboutUs({ dict }: { dict: Dictionary }) {
    const images = [about1, about2, about3]

    const { font } = useFont()

    const section0 = useInView({ triggerOnce: true, threshold: 0.1 });
    const section1 = useInView({ triggerOnce: true, threshold: 0.1 });
    const section2 = useInView({ triggerOnce: true, threshold: 0.1 });
    const section3 = useInView({ triggerOnce: true, threshold: 0.1 });

    const sections = [section0, section1, section2, section3];

    return (
        <div className={`w-full overflow-hidden max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-64 ${font.className}`}>
            {[0, 1, 2, 3].map((index) => {
                const { ref, inView } = sections[index];

                return (
                    <div
                        ref={ref}
                        key={index}
                        className={`
                            flex flex-col 
                            ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                            items-center gap-12 lg:gap-24
                            opacity-0
                            ${inView ? (index % 2 === 0 ? 'slide-in-left' : 'slide-in-right') : ''}
                        `}
                    >
                        {/* Image/Video Section */}
                        <div className="w-full lg:w-1/2">
                            <Card className="w-full shadow-lg">
                                <div className="relative w-full aspect-video lg:h-[400px] overflow-hidden rounded-lg">
                                    {index === 3 ? (
                                        <video
                                            src={videoSrc}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="object-cover w-full h-full"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    ) : (
                                        <Image
                                            src={images[index].src}
                                            alt={dict.aboutUs.titles[index]}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            </Card>
                        </div>
                        {/* Content Section */}
                        <div className="w-full lg:w-1/2">
                            <div className={`max-w-xl mx-auto lg:mx-0 ${index % 2 === 0 ? 'lg:ml-auto text-right' : 'lg:mr-auto text-left'}`}>
                                <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                                    {dict.aboutUs.titles[index]}
                                </h2>
                                <p className="text-base lg:text-lg">
                                    {dict.aboutUs.descriptions[index]}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}