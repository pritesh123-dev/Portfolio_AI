"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number }>>([])

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  // Mouse position with spring physics for smooth movement
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Apply spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Animation frame for particle animation
  const animationRef = useRef<number | undefined>(undefined);

  const angleRef = useRef(0)

  // Handle particle animation
  useEffect(() => {
    const updateParticles = () => {
      angleRef.current += 0.01

      // Update particles
      particlesRef.current.forEach((particle) => {
        particle.x += Math.sin(angleRef.current) * particle.speed
        particle.y += Math.cos(angleRef.current) * particle.speed

        // Reset particles that go too far
        const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y)
        if (distance > 40) {
          const angle = Math.atan2(particle.y, particle.x)
          particle.x = Math.cos(angle) * 20
          particle.y = Math.sin(angle) * 20
        }
      })

      animationRef.current = requestAnimationFrame(updateParticles)
    }

    animationRef.current = requestAnimationFrame(updateParticles)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Only show custom cursor on desktop devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e
      cursorX.set(clientX)
      cursorY.set(clientY)
      setIsVisible(true)

      // Update trail positions
      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: clientX, y: clientY }]
        if (newPositions.length > 12) {
          return newPositions.slice(newPositions.length - 12)
        }
        return newPositions
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track hover state on interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Add hover listeners after a short delay to ensure DOM is ready
    const timeout = setTimeout(addHoverListeners, 500)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      clearTimeout(timeout)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile or if cursor is not visible
  if (!isVisible) return null

  // Get colors based on theme
  const isDark = theme === "dark"
  const primaryColor = "#954ce9"
  const secondaryColor = "#d946ef"
  const accentColor = "#67e8f9"
  const tertiaryColor = "#38bdf8"

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Holographic cursor container */}
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
            rotate: isHovering ? [0, 15, 0, -15, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.2 },
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "60px",
              height: "60px",
              background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
              filter: "blur(8px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          {/* Holographic ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "40px",
              height: "40px",
              border: `2px solid ${primaryColor}80`,
              background: "transparent",
              backdropFilter: "blur(4px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              rotate: 360,
              borderColor: [`${primaryColor}80`, `${secondaryColor}80`, `${accentColor}80`, `${primaryColor}80`],
            }}
            transition={{
              rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              borderColor: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />

          {/* Inner holographic disc */}
          <motion.div
            className="absolute rounded-full overflow-hidden"
            style={{
              width: "30px",
              height: "30px",
              background: `radial-gradient(circle, ${primaryColor}20, ${secondaryColor}30)`,
              backdropFilter: "blur(2px)",
              transform: "translate(-50%, -50%)",
              border: `1px solid ${accentColor}50`,
            }}
            animate={{
              rotate: -360,
              borderColor: [`${accentColor}50`, `${primaryColor}50`, `${secondaryColor}50`, `${accentColor}50`],
            }}
            transition={{
              rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              borderColor: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          >
            {/* Holographic lines */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  ${primaryColor}10 1px,
                  transparent 2px,
                  transparent 4px
                )`,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  ${secondaryColor}10 1px,
                  transparent 2px,
                  transparent 4px
                )`,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Core energy */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "12px",
              height: "12px",
              background: `radial-gradient(circle, white, ${primaryColor})`,
              boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}80`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}80`,
                `0 0 15px ${secondaryColor}, 0 0 30px ${secondaryColor}80`,
                `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}80`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          {/* Floating particles */}
          {particlesRef.current.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                x: particle.x,
                y: particle.y,
                background:
                  i % 4 === 0 ? primaryColor : i % 4 === 1 ? secondaryColor : i % 4 === 2 ? accentColor : tertiaryColor,
                boxShadow: `0 0 ${particle.size * 2}px ${
                  i % 4 === 0 ? primaryColor : i % 4 === 1 ? secondaryColor : i % 4 === 2 ? accentColor : tertiaryColor
                }`,
                opacity: 0.7,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Hover indicator */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: `2px solid ${accentColor}80`,
                  background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 15px ${accentColor}40`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `1px dashed ${accentColor}60`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      {trailPositions.map((pos, i) => {
        const size = 20 - i * 1.5
        const opacity = 0.7 - i * 0.05

        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 z-[9998] pointer-events-none"
            style={{
              x: pos.x,
              y: pos.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background:
                  i % 4 === 0
                    ? `${primaryColor}30`
                    : i % 4 === 1
                      ? `${secondaryColor}30`
                      : i % 4 === 2
                        ? `${accentColor}30`
                        : `${tertiaryColor}30`,
                border: `1px solid ${
                  i % 4 === 0 ? primaryColor : i % 4 === 1 ? secondaryColor : i % 4 === 2 ? accentColor : tertiaryColor
                }50`,
                backdropFilter: "blur(2px)",
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}

