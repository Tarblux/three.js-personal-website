import React, { useRef, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useSmokeControls } from '../hooks/useSmokeControls.js'

// Vertex shader for particles
const vertexShader = `
uniform float pointMultiplier;

attribute float size;
attribute float angle;
attribute vec4 aColor;

varying vec4 vColor;
varying vec2 vAngle;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;

  vAngle = vec2(cos(angle), sin(angle));
  vColor = aColor;
}
`

// Fragment shader for particles
const fragmentShader = `
uniform sampler2D diffuseTexture;

varying vec4 vColor;
varying vec2 vAngle;

void main() {
  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  gl_FragColor = texture2D(diffuseTexture, coords) * vColor;
}
`

// Linear spline utility function
function createLinearSpline(lerp) {
  const points = []

  function addPoint(t, d) {
    points.push([t, d])
  }

  function getValueAt(t) {
    let p1 = 0

    for (let i = 0; i < points.length; i++) {
      if (points[i][0] >= t) {
        break
      }
      p1 = i
    }

    const p2 = Math.min(points.length - 1, p1 + 1)

    if (p1 === p2) {
      return points[p1][1]
    }

    return lerp(
      (t - points[p1][0]) / (points[p2][0] - points[p1][0]),
      points[p1][1], 
      points[p2][1]
    )
  }

  return { addPoint, getValueAt }
}

export function TrainSmoke(props) {
  const { camera } = useThree()
  const cloudTexture = useTexture('/textures/cloud.png')
  
  // Debug controls
  const {
    enabled,
    emissionRate,
    maxParticles,
    maxLife,
    maxSize,
    radius,
    positionX,
    positionY,
    positionZ,
    velocityY,
    velocityVariation,
    dragStrength,
    turbulence,
    alphaStart,
    alphaMax,
    alphaEnd,
    sizeStart,
    sizeEnd,
    colorStart,
    colorEnd,
    rotationRate,
    scale,
  } = useSmokeControls()
  
  // Train chimney position (controllable via debug)
  const emitterPosition = new THREE.Vector3(positionX, positionY, positionZ)
  
  // Refs for particle data
  const particlesRef = useRef([])
  const geometryRef = useRef()
  const materialRef = useRef()
  const accumulatorRef = useRef(0)
  
  // Create splines for particle animation
  const splines = useMemo(() => {
    // Alpha spline - controls opacity over particle lifetime
    const alphaSpline = createLinearSpline((t, a, b) => a + t * (b - a))
    alphaSpline.addPoint(0.0, alphaStart)
    alphaSpline.addPoint(0.2, alphaMax)
    alphaSpline.addPoint(0.7, alphaMax * 0.75)
    alphaSpline.addPoint(1.0, alphaEnd)

    // Color spline - preserve more of the cloud texture's natural appearance
    const colorSpline = createLinearSpline((t, a, b) => {
      const c = a.clone()
      return c.lerp(b, t)
    })
    // Use more subtle color changes to preserve cloud texture
    colorSpline.addPoint(0.0, new THREE.Color(0xffffff)) // Pure white to preserve texture
    colorSpline.addPoint(1.0, new THREE.Color(0xf0f0f0)) // Very subtle darkening

    // Size spline - controls particle size over lifetime
    const sizeSpline = createLinearSpline((t, a, b) => a + t * (b - a))
    sizeSpline.addPoint(0.0, sizeStart)
    sizeSpline.addPoint(0.4, 1.0)
    sizeSpline.addPoint(1.0, sizeEnd)

    return { alphaSpline, colorSpline, sizeSpline }
  }, [alphaStart, alphaMax, alphaEnd, sizeStart, sizeEnd])

  // Shader material uniforms
  const uniforms = useMemo(() => ({
    diffuseTexture: { value: cloudTexture },
    pointMultiplier: { 
      value: window.innerHeight / (2.0 * Math.tan(30.0 * Math.PI / 180.0))
    }
  }), [cloudTexture])

  // Add new particles
  const addParticles = useCallback((timeElapsed) => {
    accumulatorRef.current += timeElapsed
    const n = Math.floor(accumulatorRef.current * emissionRate)
    accumulatorRef.current -= n / emissionRate

    for (let i = 0; i < n; i++) {
      if (particlesRef.current.length >= maxParticles) break

      const life = (Math.random() * 0.5 + 0.75) * maxLife
      const particle = {
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * radius,
          (Math.random() * 2 - 1) * radius * 0.5,
          (Math.random() * 2 - 1) * radius
        ).add(emitterPosition),
        size: (Math.random() * 0.4 + 0.8) * maxSize,
        color: new THREE.Color(),
        alpha: 1.0,
        life: life,
        maxLife: life,
        rotation: Math.random() * 2.0 * Math.PI,
        rotationRate: (Math.random() - 0.5) * rotationRate,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * velocityVariation,  // Small horizontal drift
          velocityY + Math.random() * velocityVariation,    // Upward movement
          (Math.random() - 0.5) * velocityVariation * 0.6   // Small depth variation
        ),
        currentSize: 0
      }
      
      particlesRef.current.push(particle)
    }
  }, [emitterPosition, maxLife, maxSize, radius, emissionRate, maxParticles])

  // Update particle properties
  const updateParticles = useCallback((timeElapsed) => {
    // Update particle life and remove dead particles
    particlesRef.current = particlesRef.current.filter(p => {
      p.life -= timeElapsed
      return p.life > 0.0
    })

    // Update living particles
    for (let particle of particlesRef.current) {
      const t = 1.0 - particle.life / particle.maxLife
      
      // Update particle properties based on life progress
      particle.rotation += particle.rotationRate
      particle.alpha = splines.alphaSpline.getValueAt(t)
      // Simplified size calculation - use the size controls directly and apply scale
      particle.currentSize = maxSize * scale * (sizeStart + t * (sizeEnd - sizeStart))
      particle.color.copy(splines.colorSpline.getValueAt(t))

      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(timeElapsed))

      // Apply drag/air resistance
      const drag = particle.velocity.clone()
      drag.multiplyScalar(timeElapsed * dragStrength)
      
      // Limit drag to not reverse velocity
      drag.x = Math.sign(particle.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(particle.velocity.x))
      drag.y = Math.sign(particle.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(particle.velocity.y))
      drag.z = Math.sign(particle.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(particle.velocity.z))
      
      particle.velocity.sub(drag)

      // Add some turbulence for realistic smoke movement
      particle.velocity.x += (Math.random() - 0.5) * turbulence * timeElapsed
      particle.velocity.z += (Math.random() - 0.5) * turbulence * timeElapsed
    }

    // Sort particles by distance to camera for proper alpha blending
    particlesRef.current.sort((a, b) => {
      const d1 = camera.position.distanceTo(a.position)
      const d2 = camera.position.distanceTo(b.position)
      return d2 - d1  // Far to near
    })
  }, [camera, splines])

  // Update geometry with current particle data
  const updateGeometry = useCallback(() => {
    if (!geometryRef.current) return

    const positions = []
    const sizes = []
    const colors = []
    const angles = []

    for (let particle of particlesRef.current) {
      positions.push(particle.position.x, particle.position.y, particle.position.z)
      colors.push(particle.color.r, particle.color.g, particle.color.b, particle.alpha)
      sizes.push(particle.currentSize)
      angles.push(particle.rotation)
    }

    geometryRef.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometryRef.current.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    geometryRef.current.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 4))
    geometryRef.current.setAttribute('angle', new THREE.Float32BufferAttribute(angles, 1))

    geometryRef.current.attributes.position.needsUpdate = true
    geometryRef.current.attributes.size.needsUpdate = true
    geometryRef.current.attributes.aColor.needsUpdate = true
    geometryRef.current.attributes.angle.needsUpdate = true
  }, [])

  // Main animation loop
  useFrame((state, delta) => {
    if (!enabled) return
    addParticles(delta)
    updateParticles(delta)
    updateGeometry()
  })

  // Don't render anything if disabled
  if (!enabled) return null

  return (
    <points {...props}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(), 3]} />
        <bufferAttribute attach="attributes-size" args={[new Float32Array(), 1]} />
        <bufferAttribute attach="attributes-aColor" args={[new Float32Array(), 4]} />
        <bufferAttribute attach="attributes-angle" args={[new Float32Array(), 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.NormalBlending}
        depthTest={true}
        depthWrite={false}
        transparent={true}
        vertexColors={true}
      />
    </points>
  )
}
