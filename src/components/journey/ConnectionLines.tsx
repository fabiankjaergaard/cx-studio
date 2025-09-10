'use client'

import React, { useRef, useEffect } from 'react'
import { CustomerJourney, TouchpointConnection } from '@/types'

interface ConnectionLinesProps {
  journey: CustomerJourney
  canvasRef: React.RefObject<HTMLDivElement>
}

export function ConnectionLines({ journey, canvasRef }: ConnectionLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const getConnectionPoints = (fromId: string, toId: string) => {
    const fromElement = document.querySelector(`[data-touchpoint-id="${fromId}"]`)
    const toElement = document.querySelector(`[data-touchpoint-id="${toId}"]`)
    if (!fromElement || !toElement || !canvasRef.current) return null

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()
    
    // Start point: connection dot position (outside right edge)
    const fromPoint = {
      x: fromRect.right - canvasRect.left + 8,
      y: fromRect.top + fromRect.height / 2 - canvasRect.top
    }
    
    // End point: left edge of to card  
    const toPoint = {
      x: toRect.left - canvasRect.left,
      y: toRect.top + toRect.height / 2 - canvasRect.top
    }
    
    return { fromPoint, toPoint }
  }

  const renderConnections = () => {
    if (!svgRef.current || !canvasRef.current) return

    const svg = svgRef.current
    const canvasRect = canvasRef.current.getBoundingClientRect()
    
    // Clear existing paths
    svg.innerHTML = ''

    journey.connections.forEach((connection) => {
      const points = getConnectionPoints(connection.fromTouchpointId, connection.toTouchpointId)
      if (!points) return

      const { fromPoint, toPoint } = points

      // Create curved path from connection dot to target edge
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const controlX = fromPoint.x + (toPoint.x - fromPoint.x) / 2
      const pathData = `M ${fromPoint.x} ${fromPoint.y} Q ${controlX} ${fromPoint.y}, ${toPoint.x} ${toPoint.y}`
      
      path.setAttribute('d', pathData)
      path.setAttribute('stroke', '#6B7280')
      path.setAttribute('stroke-width', '2')
      path.setAttribute('fill', 'none')
      path.setAttribute('opacity', '0.7')
      path.style.pointerEvents = 'stroke'
      path.style.cursor = 'pointer'
      
      // Add click handler to delete connection
      path.addEventListener('click', () => {
        // You could add a delete connection handler here
      })

      svg.appendChild(path)
    })
  }

  useEffect(() => {
    renderConnections()
    
    // Re-render on resize
    const handleResize = () => {
      setTimeout(renderConnections, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Re-render when DOM changes (for touchpoint movements)
    const observer = new MutationObserver(() => {
      setTimeout(renderConnections, 50)
    })
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [journey.connections])

  if (!canvasRef.current) return null

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{
        width: '100%',
        height: '100%'
      }}
    >
    </svg>
  )
}