'use client'

import videoSrc from '@/public/assets/videohomprieto.mp4'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider';

export function Hero({ dict }: { dict: Dictionary }) {
  const { font } = useFont();

  return (
    <section className={`relative min-h-[100vh] ${font.className}`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[100vh] object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-[#EAEAEA] px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-[#EAEAEA] sm:text-5xl md:text-6xl font-bold text-center mb-4">
          {dict.hero.title}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-8">
          {dict.hero.subtitle}
        </h2>
      </div>
    </section>
  )
}
