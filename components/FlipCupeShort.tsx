'use client'

import { useState, useEffect, useCallback } from 'react'
import cubeVideo1Short from '@/public/assets/cubeVideo1Short.mp4'
import cubeVideo2Short from '@/public/assets/cubeVideo2Short.mp4'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider'

export default function FlipCubeShort({ dict }: { dict: Dictionary }) {
  const [currentFace, setCurrentFace] = useState(0)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const faces = ['front', 'right', 'back', 'left', 'top', 'bottom']
  const videos = [
    cubeVideo1Short,
    cubeVideo2Short,
    cubeVideo1Short,
    cubeVideo2Short,
    cubeVideo1Short,
    cubeVideo2Short,
  ]

  const { font } = useFont();

  const getActiveFace = useCallback((currentFace: number) => {
    switch (currentFace) {
      case 0: return 'front';
      case 1: return 'right';
      case 2: return 'back';
      case 3: return 'left';
      case 4: return 'bottom';//front
      case 5: return 'top';//top
      default: return 'front';
    }
  }, []);

  const handleRotate = useCallback(() => {
    setCurrentFace((prev) => (prev + 1) % faces.length)
    setLastInteraction(Date.now())
  }, [faces.length])

  useEffect(() => {
    console.log(currentFace)
  }, [currentFace])

  // Auto-rotation effect
  useEffect(() => {
    const autoRotationInterval = setInterval(() => {
      const now = Date.now()
      if (now - lastInteraction >= 4000) { // 4 seconds
        handleRotate()
      }
    }, 4000)

    return () => clearInterval(autoRotationInterval)
  }, [lastInteraction, handleRotate])

  return (
    <section className={`flex ${font} min-h-[88vh] flex-col items-center justify-center gap-8 ${font.className}`}>
      <style jsx>{`
        .cube-container {
          perspective: 1000px;
          width: 250px;
          height: 250px;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .cube-container {
            width: 280px;
            height: 280px;
          }
        }

        @media (min-width: 1024px) {
          .cube-container {
            width: 300px;
            height: 300px;
          }
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s;
          transform: rotateX(-15deg) rotateY(15deg);
        }
        .cube.show-front { transform: rotateX(-15deg) rotateY(0deg); }
        .cube.show-right { transform: rotateX(-15deg) rotateY(-90deg); }
        .cube.show-back { transform: rotateX(-15deg) rotateY(-180deg); }
        .cube.show-left { transform: rotateX(-15deg) rotateY(90deg); }
        .cube.show-top { transform: rotateX(90deg) rotateY(0deg); }
        .cube.show-bottom { transform: rotateX(-90deg) rotateY(0deg); }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          border: 4px solid hsl(var(--muted));
          background-color: hsl(var(--muted) / 0.1);
          border-radius: var(--radius);
        }

        .face.active {
          border-color: hsl(var(--secondary));
        }

        .face video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: calc(var(--radius) - 4px);
        }

        .face.front { transform: rotateY(0deg) translateZ(125px); }
        .face.right { transform: rotateY(90deg) translateZ(125px); }
        .face.back { transform: rotateY(180deg) translateZ(125px); }
        .face.left { transform: rotateY(-90deg) translateZ(125px); }
        .face.top { transform: rotateX(90deg) translateZ(125px); }
        .face.bottom { transform: rotateX(-90deg) translateZ(125px); }

        @media (min-width: 768px) {
          .face.front { transform: rotateY(0deg) translateZ(140px); }
          .face.right { transform: rotateY(90deg) translateZ(140px); }
          .face.back { transform: rotateY(180deg) translateZ(140px); }
          .face.left { transform: rotateY(-90deg) translateZ(140px); }
          .face.top { transform: rotateX(90deg) translateZ(140px); }
          .face.bottom { transform: rotateX(-90deg) translateZ(140px); }
        }

        @media (min-width: 1024px) {
          .face.front { transform: rotateY(0deg) translateZ(150px); }
          .face.right { transform: rotateY(90deg) translateZ(150px); }
          .face.back { transform: rotateY(180deg) translateZ(150px); }
          .face.left { transform: rotateY(-90deg) translateZ(150px); }
          .face.top { transform: rotateX(90deg) translateZ(150px); }
          .face.bottom { transform: rotateX(-90deg) translateZ(150px); }
        }
      `}</style>
      <h1 className='mb-2'>
        {dict.whatWeDo.title}
      </h1>
      <div
        className="cube-container"
        onClick={handleRotate}
        onMouseMove={() => setLastInteraction(Date.now())} // Reset timer on mouse movement
        onTouchStart={() => setLastInteraction(Date.now())} // Reset timer on touch
      >
        <div className={`cube show-${faces[currentFace]}`}>
          {faces.map((face, index) => (
            <div key={face} className={`face ${face} ${face === getActiveFace(currentFace) ? 'active' : ''}`}>
              <video
                autoPlay
                muted
                playsInline
                src={videos[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}