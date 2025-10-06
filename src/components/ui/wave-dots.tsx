'use client'

import { useEffect, useRef } from 'react'

export function WaveDots() {
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

    // Match the original Three.js settings
    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60
    let count = 0

    const animate = () => {
      // Clear with white background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set dot color
      ctx.fillStyle = '#333333'

      // Draw dots with wave animation - exact same logic as Three.js version
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Same position calculation as Three.js
          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2 + canvas.width / 2
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2 + canvas.height / 2

          // Same wave calculation as Three.js version
          const waveY = Math.sin((ix + count) * 0.2) * 80 + Math.sin((iy + count) * 0.3) * 60
          const y = canvas.height / 2 + waveY

          // Draw dot
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      count += 0.05 // Same speed as Three.js version
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}