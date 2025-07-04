'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { X, ZoomIn, ZoomOut, Share, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useWindowSize } from 'react-use'
import { useRouter } from 'next/navigation'
import type { StaticImageData } from 'next/image'


type ProjectImage = {
  src: StaticImageData
  width: number
  height: number
}

interface FullscreenViewerProps {

  initialIndex: number
  lang: string
  projectId: number
  project: {
    title: string;
    images: ProjectImage[];
  }
}

export function FullscreenViewer({
  initialIndex,
  lang,
  projectId,
  project
}: FullscreenViewerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  // Use react-spring for smooth animations
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const handleClose = useCallback(() => {
    router.push(`/${lang}/projects`);
  }, [router, lang]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, project.images.length])

  useEffect(() => {
    const element = document.documentElement
    if (isFullscreen) {
      element.requestFullscreen().catch((err) => console.error(err))
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err))
    }
  }, [isFullscreen])

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.1, 1)
      if (newZoom === 1) {
        api.start({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const handleShare = useCallback(async () => {
    // Construct the shareable URL using the current window location and image index
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}/${lang}/projects/${projectId}/${currentIndex}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          url: shareUrl
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }, [currentIndex, lang, project.title, projectId])

  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
  }

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
  }

  const bind = useDrag(({ offset: [ox, oy], last }) => {
    if (zoomLevel > 1) {
      const image = imageRef.current
      if (image) {
        const rect = image.getBoundingClientRect()
        const scaledWidth = rect.width * zoomLevel
        const scaledHeight = rect.height * zoomLevel

        const maxX = Math.max(0, (scaledWidth - windowWidth) / 2)
        const maxY = Math.max(0, (scaledHeight - windowHeight) / 2)

        const newX = Math.max(-maxX, Math.min(maxX, ox))
        const newY = Math.max(-maxY, Math.min(maxY, oy))

        api.start({ x: newX, y: newY, immediate: !last })
      }
    }
  }, {
    bounds: { left: -Infinity, right: Infinity, top: -Infinity, bottom: Infinity },
    rubberband: true,
    from: () => [x.get(), y.get()],
  })

  const preventDefaultDrag = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the overlay itself
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }



  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
    >
      <div className="absolute z-50 top-4 left-4 right-4 flex justify-between items-center text-[#EAEAEA]">
        <span className="text-sm">
          Image {currentIndex + 1} of {project.images.length}
        </span>
        <div className="flex items-center space-x-4">
          <button onClick={handleZoomOut} className="p-2 hover:bg-muted rounded-full transition-colors">
            <ZoomOut className="w-6 h-6" />
            <span className="sr-only">Zoom Out</span>
          </button>
          <button onClick={handleZoomIn} className="p-2 hover:bg-muted rounded-full transition-colors">
            <ZoomIn className="w-6 h-6" />
            <span className="sr-only">Zoom In</span>
          </button>
          <button onClick={handleShare} className="p-2 hover:bg-muted rounded-full transition-colors">
            <Share className="w-6 h-6" />
            <span className="sr-only">Share</span>
          </button>
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 hover:bg-muted rounded-full transition-colors hidden md:block"
          >
            {isFullscreen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4-4l-5 5" />
              </svg>
            )}
            <span className="sr-only">{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
          </button>
          <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <button
          onClick={handlePrevImage}
          className="absolute left-4 p-2 bg-background/50 text-foreground rounded-full hover:bg-background/75 transition-opacity z-10"
        >
          <ChevronLeft className="w-8 h-8" />
          <span className="sr-only">Previous Image</span>
        </button>
        <animated.div
          {...bind()}
          className="w-full h-full flex items-center justify-center"
          style={{ touchAction: 'none' }}
        >
          <animated.img
            ref={imageRef}
            src={project.images[currentIndex].src.src}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain transition-duration-300 ease-in-out"
            style={{
              transform: x.to(x => `translate(${x}px, ${y.get()}px) scale(${zoomLevel})`),
              cursor: zoomLevel > 1 ? 'grab' : 'default',
              touchAction: 'none',
            }}
            onDragStart={preventDefaultDrag}
            onClick={(e) => e.stopPropagation()}
          />
        </animated.div>
        <button
          onClick={handleNextImage}
          className="absolute right-4 p-2 bg-background/50 text-foreground rounded-full hover:bg-background/75 transition-opacity z-10"
        >
          <ChevronRight className="w-8 h-8" />
          <span className="sr-only">Next Image</span>
        </button>
      </div>
    </div>
  )
}