"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { Suspense } from "react"

// Generate random points in a 3D space
function generatePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = Math.cbrt(Math.random()) * radius

    points[i3] = r * Math.sin(phi) * Math.cos(theta)
    points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    points[i3 + 2] = r * Math.cos(phi)
  }
  return points
}

// Generate static stars for the night sky
function generateStars(count: number, width: number, height: number, depth: number) {
  const stars = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    // Position stars randomly across the screen
    stars[i3] = (Math.random() - 0.5) * width * 2
    stars[i3 + 1] = (Math.random() - 0.5) * height * 2
    stars[i3 + 2] = (Math.random() - 0.5) * depth - 5 // Depth

    // Random size for each star
    sizes[i] = Math.random() * 1.5 + 0.5

    // Random color (white to blue-ish)
    const colorChoice = Math.random()
    if (colorChoice > 0.8) {
      // Blue-ish stars
      colors[i3] = 0.7 + Math.random() * 0.3 // R
      colors[i3 + 1] = 0.8 + Math.random() * 0.2 // G
      colors[i3 + 2] = 1 // B
    } else if (colorChoice > 0.6) {
      // Yellow-ish stars
      colors[i3] = 1 // R
      colors[i3 + 1] = 0.9 + Math.random() * 0.1 // G
      colors[i3 + 2] = 0.6 + Math.random() * 0.4 // B
    } else {
      // White stars
      colors[i3] = 0.9 + Math.random() * 0.1 // R
      colors[i3 + 1] = 0.9 + Math.random() * 0.1 // G
      colors[i3 + 2] = 0.9 + Math.random() * 0.1 // B
    }
  }

  return { positions: stars, sizes, colors }
}

// Generate falling stars
function generateFallingStars(count: number, width: number, height: number, depth: number) {
  const stars = new Float32Array(count * 3)
  const velocities = new Float32Array(count)
  const sizes = new Float32Array(count)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    // Position stars randomly across the screen
    stars[i3] = (Math.random() - 0.5) * width * 2
    stars[i3 + 1] = (Math.random() - 0.5) * height * 2 + height / 2 // Start from top
    stars[i3 + 2] = (Math.random() - 0.5) * depth - 5 // Depth

    // Random velocity for each star
    velocities[i] = 0.05 + Math.random() * 0.15

    // Random size for each star
    sizes[i] = Math.random() * 2 + 1

    // White to blue colors
    colors[i3] = 0.8 + Math.random() * 0.2 // R
    colors[i3 + 1] = 0.8 + Math.random() * 0.2 // G
    colors[i3 + 2] = 1 // B
  }

  return { positions: stars, velocities, sizes, colors }
}

function StaticStars() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  // Create stars
  const count = 2000
  const { positions, sizes, colors } = useMemo(
    () => generateStars(count, viewport.width * 2, viewport.height * 2, 20),
    [viewport],
  )

  // Create a buffer for sizes that we'll update
  const sizesArray = useMemo(() => new Float32Array(sizes), [sizes])

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry.attributes.size) {
      // Subtle twinkling effect
      const time = state.clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
        // Make stars twinkle at different rates
        sizesArray[i] = (Math.sin(time * (0.2 + 0.1 * Math.sin(i))) + 1) * 0.5 + 0.5
      }

      pointsRef.current.geometry.attributes.size.array = sizesArray
      pointsRef.current.geometry.attributes.size.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={1.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FallingStars() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  // Create stars
  const count = 300
  const { positions, velocities } = useMemo(
    () => generateFallingStars(count, viewport.width * 2, viewport.height * 2, 10),
    [viewport],
  )

  // Create a buffer for positions that we'll update
  const positionsArray = useMemo(() => new Float32Array(positions), [positions])

  useFrame(() => {
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      // Update each star position
      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Move star down
        positionsArray[i3 + 1] -= velocities[i]

        // If star goes below screen, reset to top
        if (positionsArray[i3 + 1] < -viewport.height) {
          positionsArray[i3] = (Math.random() - 0.5) * viewport.width * 2
          positionsArray[i3 + 1] = viewport.height
          positionsArray[i3 + 2] = (Math.random() - 0.5) * 10 - 5
        }
      }

      pointsRef.current.geometry.attributes.position.array = positionsArray
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
        color="#ffffff"
      />
    </Points>
  )
}

function StarTrails() {
  const trailsRef = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  // Create more prominent shooting stars with trails
  const count = 30
  const trailLength = 15
  const totalPoints = count * trailLength

  // Generate initial positions for the shooting stars
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(totalPoints * 3)
    const velocities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Initial position for each shooting star
      const x = (Math.random() - 0.5) * viewport.width * 2
      const y = viewport.height + Math.random() * viewport.height
      const z = (Math.random() - 0.5) * 10 - 5

      // Create trail points
      for (let j = 0; j < trailLength; j++) {
        const index = (i * trailLength + j) * 3
        positions[index] = x
        positions[index + 1] = y - j * 0.1 // Trail extends behind
        positions[index + 2] = z
      }

      // Random velocity
      velocities[i] = 0.2 + Math.random() * 0.3
    }

    return { positions, velocities }
  }, [viewport])

  // Create a buffer for positions that we'll update
  const positionsArray = useMemo(() => new Float32Array(positions), [positions])

  useFrame(() => {
    if (trailsRef.current && trailsRef.current.geometry.attributes.position) {
      for (let i = 0; i < count; i++) {
        // Update each shooting star and its trail
        for (let j = trailLength - 1; j > 0; j--) {
          const currentIndex = (i * trailLength + j) * 3
          const prevIndex = (i * trailLength + j - 1) * 3

          // Move trail points to follow the head
          positionsArray[currentIndex] = positionsArray[prevIndex]
          positionsArray[currentIndex + 1] = positionsArray[prevIndex + 1]
          positionsArray[currentIndex + 2] = positionsArray[prevIndex + 2]
        }

        // Move the head of the shooting star
        const headIndex = i * trailLength * 3
        positionsArray[headIndex + 1] -= velocities[i]
        positionsArray[headIndex] -= velocities[i] * 0.3 // Slight diagonal movement

        // If shooting star goes below screen, reset to top
        if (positionsArray[headIndex + 1] < -viewport.height) {
          const x = (Math.random() - 0.5) * viewport.width * 2
          const y = viewport.height + Math.random() * 5
          const z = (Math.random() - 0.5) * 10 - 5

          // Reset all trail points
          for (let j = 0; j < trailLength; j++) {
            const index = (i * trailLength + j) * 3
            positionsArray[index] = x
            positionsArray[index + 1] = y - j * 0.1
            positionsArray[index + 2] = z
          }
        }
      }

      trailsRef.current.geometry.attributes.position.array = positionsArray
      trailsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Create sizes array for the trail effect (head is bigger than tail)
  const sizes = useMemo(() => {
    const array = new Float32Array(totalPoints)
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < trailLength; j++) {
        const size = ((trailLength - j) / trailLength) * 2
        array[i * trailLength + j] = size
      }
    }
    return array
  }, [count, trailLength])

  return (
    <Points ref={trailsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
        color="#ffffff"
      />
    </Points>
  )
}

function NightSkyBackground() {
  const meshRef = useRef<THREE.Mesh>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorTop: { value: new THREE.Color("#000B18") }, // Very dark blue
      uColorBottom: { value: new THREE.Color("#0F2447") }, // Dark blue with a hint of purple
    }),
    [],
  )

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.1
      }
    }
  })

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorTop;
    uniform vec3 uColorBottom;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Gradient background
      vec3 color = mix(uColorBottom, uColorTop, uv.y);
      
      // Add subtle noise for a more natural look
      float noise = random(uv + uTime * 0.01) * 0.03;
      color += noise;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={40}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
    </mesh>
  )
}

export default function ThreeBackground() {
  // Force dark theme for night sky
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  return (
    <div className="fixed inset-0 -z-10 bg-[#000B18]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <NightSkyBackground />
          <StaticStars />
          <FallingStars />
          <StarTrails />
          <ambientLight intensity={0.1} />
        </Suspense>
      </Canvas>
    </div>
  )
}

