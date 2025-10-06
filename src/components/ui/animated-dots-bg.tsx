'use client'

import { useEffect, useRef } from 'react'

export function AnimatedDotsBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Dot grid settings
    const gridSize = 80
    const dotSize = 2
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#333333'

      // Draw wave pattern
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          // Create wave effect with sine functions
          const wave1 = Math.sin((x + time) * 0.01) * 30
          const wave2 = Math.sin((y + time) * 0.015) * 20
          const wave3 = Math.sin((x + y + time) * 0.008) * 15

          const offsetX = wave1 + wave3
          const offsetY = wave2 + wave3

          const finalX = x + offsetX
          const finalY = y + offsetY

          // Draw dot
          ctx.beginPath()
          ctx.arc(finalX, finalY, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      time += 2 // Speed of animation
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        body {
          background-color: white;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </>
  )
}