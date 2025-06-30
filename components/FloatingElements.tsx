'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number
    icon: string
    x: number
    y: number
    delay: number
    duration: number
    size: number
  }>>([])

  useEffect(() => {
    const icons = ['💼', '📊', '💡', '🎯', '📈', '⚡', '🚀', '💎', '🔬', '🌟']
    
    const newElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 95 + 2.5,
      y: Math.random() * 95 + 2.5,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      size: Math.random() * 24 + 24
    }))
    
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-[0.08]"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements 