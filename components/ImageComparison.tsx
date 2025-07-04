'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { before, after } from '@/lib/assets'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider'

export function ImageComparison({ dict }: { dict: Dictionary }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const isHoverDevice = useRef(false)

  const { font } = useFont();

  const handleMove = useCallback(
    (clientX: number) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerWidth = containerRect.width
        const mouseX = clientX - containerRect.left
        const newPosition = (mouseX / containerWidth) * 100
        setSliderPosition(Math.max(0, Math.min(100, newPosition)))
      }
    },
    []
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDraggingRef.current || isHoverDevice.current) {
        handleMove(event.clientX)
      }
    },
    [handleMove]
  )

  const handleStartDragging = useCallback(() => {
    isDraggingRef.current = true
  }, [])

  const handleStopDragging = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  const handleTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault()
    handleStartDragging()
  }, [handleStartDragging])

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()
      if (isDraggingRef.current) {
        handleMove(event.touches[0].clientX)
      }
    },
    [handleMove]
  )


  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleMouseEnter = () => {
        isHoverDevice.current = true
      }

      const handleMouseLeave = () => {
        isHoverDevice.current = false
      }

      container.addEventListener('mousedown', handleStartDragging)
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseup', handleStopDragging)
      container.addEventListener('mouseleave', handleStopDragging)
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleStopDragging)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mousedown', handleStartDragging)
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseup', handleStopDragging)
        container.removeEventListener('mouseleave', handleStopDragging)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleStopDragging)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [handleMouseMove, handleTouchMove, handleStartDragging, handleStopDragging, handleTouchStart])

  return (
    <section className={` flex min-h-[88vh] px-4 md:px-0 flex-col gap-4 bg-background ${font.className}`}>
      <h1 className='mb-2'>
        {dict.imageComparison.title}
      </h1>
      <Card className="w-full max-w-[640px] mx-auto pt-6 ">
        <CardContent>
          <div
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[400px] overflow-hidden cursor-ew-resize rounded-lg"
          >
            <Image
              src={before.src}
              alt={before.alt}
              fill
              className="object-contain rounded-lg"
            />
            <div
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              className="absolute top-0 left-0 right-0 bottom-0 rounded-lg overflow-hidden"
            >
              <Image
                src={after.src}
                alt={after.alt}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.7)]"
            >
              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-12 h-12 bg-primary rounded-full flex items-center justify-center",
                "shadow-[0_0_15px_rgba(var(--primary),0.9)]",
                "transition-transform duration-200 ease-in-out transform hover:scale-110"
              )}>
                <div className="flex items-center justify-center space-x-1">
                  <ChevronLeft className="w-4 h-4 text-primary-foreground" />
                  <ChevronRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground">{dict.imageComparison.description}</p>
        </CardFooter>
      </Card>
    </section>
  )
}
