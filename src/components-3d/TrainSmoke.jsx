import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useSmokeControls } from '../hooks/useSmokeControls.js'

// TODO: Move shaders to a separate file (had  a issue before so i'm not sure if it's a good idea)
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

export function TrainSmoke({ emitterRef, autoPlay, ...props }) {
  const { camera, size } = useThree()
  const cloudTexture = useTexture('/textures/cloud.png')
  
  // Track elapsed time since autoplay started for reliable timing
  const autoPlayStartTimeRef = useRef(null)
  const elapsedTimeRef = useRef(0)
  const autoPlayCompletedRef = useRef(false)
  const manualOverrideLoggedRef = useRef(false)
  
  // Debug controls
  const {
    enabled,
    manualOverride,
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
    rotationRate,
    scale,
    // Color controls
    colorStart,
    colorEnd,
    // Debug controls
    showDebugInfo,
    logEmitterPosition,
    logParticleCount,
    showTimingInfo,
    // Timing controls
    startTime,
    endTime,
    residualEmission,
  } = useSmokeControls()

  // Initialize autoplay start time when autoPlay begins
  useEffect(() => {
    if (autoPlay && autoPlayStartTimeRef.current === null) {
      autoPlayStartTimeRef.current = Date.now() / 1000 // Convert to seconds
      elapsedTimeRef.current = 0
      autoPlayCompletedRef.current = false
      // console.log('TrainSmoke: AutoPlay started, timing initialized')
    } else if (!autoPlay && autoPlayStartTimeRef.current !== null) {
      // AutoPlay has ended - mark as completed
      autoPlayCompletedRef.current = true
      autoPlayStartTimeRef.current = null
      elapsedTimeRef.current = 0
      // console.log('TrainSmoke: AutoPlay ended, emission disabled')
    }
  }, [autoPlay])

  // Calculate time-based emission rate 
  const getEffectiveEmissionRate = useCallback((currentElapsedTime) => {
    if (!enabled) return 0
    
    // If autoplay has completed, disable emission unless manually overridden
    if (autoPlayCompletedRef.current && !autoPlay && !manualOverride) {
      return 0
    }
    
    // Log when manual override is being used
    if (autoPlayCompletedRef.current && !autoPlay && manualOverride) {
      // Only log once when override is first enabled
      if (!manualOverrideLoggedRef.current) {
        console.log('TrainSmoke: Manual override enabled, re-starting emission')
        manualOverrideLoggedRef.current = true
      }
    } else if (!manualOverride) {
      // Reset the log flag when override is disabled
      manualOverrideLoggedRef.current = false
    }
    
    // During autoplay, control emission based on elapsed time since autoplay started
    if (autoPlay && autoPlayStartTimeRef.current !== null) {
      
      // Log timing details every second for debugging
      if (Math.floor(currentElapsedTime) !== Math.floor(elapsedTimeRef.current)) {
        console.log('Smoke Timing Debug:', {
          elapsedTime: currentElapsedTime.toFixed(2),
          startTime: startTime,
          endTime: endTime,
          shouldEmit: currentElapsedTime >= startTime,
          emissionPhase: currentElapsedTime < startTime ? 'waiting' : 
                        currentElapsedTime <= endTime ? 'active' : 'residual'
        })
      }
      
      // No emission before start time
      if (currentElapsedTime < startTime) {
        return 0
      }
      
      // Gradual reduction from start time to end time
      if (currentElapsedTime >= startTime && currentElapsedTime <= endTime) {
        const progress = (currentElapsedTime - startTime) / (endTime - startTime) // 0 to 1 over duration
        const emissionMultiplier = 1 - progress // Start at 1, end at 0
        const effectiveRate = emissionRate * emissionMultiplier
        
        // Log emission start
        if (currentElapsedTime >= startTime && elapsedTimeRef.current < startTime) {
          console.log('TrainSmoke: EMISSION STARTED at', currentElapsedTime.toFixed(2), 'seconds')
        }
        
        return effectiveRate
      }
      
      // After end time, minimal emission for realism
      if (currentElapsedTime > endTime) {
        // Log transition to residual
        if (currentElapsedTime > endTime && elapsedTimeRef.current <= endTime) {
          console.log('TrainSmoke: Switching to residual emission at', currentElapsedTime.toFixed(2), 'seconds')
        }
        return emissionRate * residualEmission
      }
    }
    
    // When not in autoplay mode and autoplay hasn't completed yet, use full emission rate from controls
    return emissionRate
  }, [enabled, autoPlay, manualOverride, emissionRate, startTime, endTime, residualEmission])
  
  // Emitter position - initialize with fallback position
  const emitterPositionRef = useRef(new THREE.Vector3(positionX, positionY, positionZ))
  const lastEmitterPositionRef = useRef(new THREE.Vector3())
  const emitterHasMovedRef = useRef(false)

  // Update emitter position each frame from the group ref
  useFrame(() => {
    if (emitterRef?.current) {
      const newPosition = new THREE.Vector3()
      emitterRef.current.getWorldPosition(newPosition)
      
      // Check if emitter has moved significantly
      const distance = newPosition.distanceTo(lastEmitterPositionRef.current)
      emitterHasMovedRef.current = distance > 0.1
      
      lastEmitterPositionRef.current.copy(emitterPositionRef.current)
      emitterPositionRef.current.copy(newPosition)
    } else {
      // Fallback to debug controls if no ref
      emitterPositionRef.current.set(positionX, positionY, positionZ)
    }
  })
  
  // Refs for particle data
  const particlesRef = useRef([])
  const geometryRef = useRef()
  const materialRef = useRef()
  const accumulatorRef = useRef(0)
  
  // Pre-allocate buffer arrays to avoid constant reallocation
  const bufferArraysRef = useRef({
    positions: new Float32Array(maxParticles * 3),
    sizes: new Float32Array(maxParticles),
    colors: new Float32Array(maxParticles * 4),
    angles: new Float32Array(maxParticles)
  })

  // Update buffer arrays when maxParticles changes
  useEffect(() => {
    bufferArraysRef.current = {
      positions: new Float32Array(maxParticles * 3),
      sizes: new Float32Array(maxParticles),
      colors: new Float32Array(maxParticles * 4),
      angles: new Float32Array(maxParticles)
    }
  }, [maxParticles])
  
  // Create splines for particle animation
  const splines = useMemo(() => {
    // Alpha spline - controls opacity over particle lifetime
    const alphaSpline = createLinearSpline((t, a, b) => a + t * (b - a))
    alphaSpline.addPoint(0.0, alphaStart)
    alphaSpline.addPoint(0.2, alphaMax)
    alphaSpline.addPoint(0.7, alphaMax * 0.75)
    alphaSpline.addPoint(1.0, alphaEnd)

    // Color spline - use user-defined colors while preserving cloud texture
    const colorSpline = createLinearSpline((t, a, b) => {
      const c = a.clone()
      return c.lerp(b, t)
    })
    // Use customizable color changes from controls
    colorSpline.addPoint(0.0, new THREE.Color(colorStart))
    colorSpline.addPoint(1.0, new THREE.Color(colorEnd))

    // Size spline - controls particle size over lifetime
    const sizeSpline = createLinearSpline((t, a, b) => a + t * (b - a))
    sizeSpline.addPoint(0.0, sizeStart)
    sizeSpline.addPoint(0.4, 1.0)
    sizeSpline.addPoint(1.0, sizeEnd)

    return { alphaSpline, colorSpline, sizeSpline }
  }, [alphaStart, alphaMax, alphaEnd, sizeStart, sizeEnd, colorStart, colorEnd])

  // Shader material uniforms - update pointMultiplier when camera changes
  const uniforms = useMemo(() => ({
    diffuseTexture: { value: cloudTexture },
    pointMultiplier: { 
      value: size.height / (2.0 * Math.tan((camera.fov * Math.PI / 180) / 2.0))
    }
  }), [cloudTexture, size.height, camera.fov])

  // Add new particles
  const addParticles = useCallback((timeElapsed) => {
    const effectiveRate = getEffectiveEmissionRate(elapsedTimeRef.current)
    
    // Skip particle creation if emission rate is zero
    if (effectiveRate <= 0) {
      accumulatorRef.current = 0
      return
    }
    
    accumulatorRef.current += timeElapsed
    const n = Math.floor(accumulatorRef.current * effectiveRate)
    accumulatorRef.current -= n / effectiveRate

    for (let i = 0; i < n; i++) {
      if (particlesRef.current.length >= maxParticles) break

      const life = (Math.random() * 0.5 + 0.75) * maxLife
      const particle = {
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * radius,
          (Math.random() * 2 - 1) * radius * 0.5,
          (Math.random() * 2 - 1) * radius
        ).add(emitterPositionRef.current),
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
  }, [emitterPositionRef, maxLife, maxSize, radius, getEffectiveEmissionRate, maxParticles, velocityY, velocityVariation, rotationRate])

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
      particle.rotation += particle.rotationRate * timeElapsed
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

    // Only sort particles occasionally to improve performance (every 10 frames)
    // and only when camera has moved significantly or emitter has moved
    if (particlesRef.current.frameCounter === undefined) {
      particlesRef.current.frameCounter = 0
    }
    particlesRef.current.frameCounter++
    
    if (particlesRef.current.frameCounter % 10 === 0 || emitterHasMovedRef.current) {
      particlesRef.current.sort((a, b) => {
        const d1 = camera.position.distanceTo(a.position)
        const d2 = camera.position.distanceTo(b.position)
        return d2 - d1  // Far to near
      })
    }
  }, [camera, splines, maxSize, scale, sizeStart, sizeEnd, dragStrength, turbulence])

  // Update geometry with current particle data
  const updateGeometry = useCallback(() => {
    if (!geometryRef.current) return

    const particleCount = particlesRef.current.length
    const buffers = bufferArraysRef.current
    
    // Fill buffer arrays with particle data
    for (let i = 0; i < particleCount; i++) {
      const particle = particlesRef.current[i]
      const i3 = i * 3
      const i4 = i * 4
      
      // Position
      buffers.positions[i3] = particle.position.x
      buffers.positions[i3 + 1] = particle.position.y
      buffers.positions[i3 + 2] = particle.position.z
      
      // Color with alpha
      buffers.colors[i4] = particle.color.r
      buffers.colors[i4 + 1] = particle.color.g
      buffers.colors[i4 + 2] = particle.color.b
      buffers.colors[i4 + 3] = particle.alpha
      
      // Size and angle
      buffers.sizes[i] = particle.currentSize
      buffers.angles[i] = particle.rotation
    }

    // Update geometry attributes with proper count
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(buffers.positions, 3))
    geometryRef.current.setAttribute('size', new THREE.BufferAttribute(buffers.sizes, 1))
    geometryRef.current.setAttribute('aColor', new THREE.BufferAttribute(buffers.colors, 4))
    geometryRef.current.setAttribute('angle', new THREE.BufferAttribute(buffers.angles, 1))

    // Set the draw range to only render active particles
    geometryRef.current.setDrawRange(0, particleCount)

    geometryRef.current.attributes.position.needsUpdate = true
    geometryRef.current.attributes.size.needsUpdate = true
    geometryRef.current.attributes.aColor.needsUpdate = true
    geometryRef.current.attributes.angle.needsUpdate = true
  }, [])

  // Clear particles when disabled
  useEffect(() => {
    if (!enabled) {
      particlesRef.current = []
      accumulatorRef.current = 0
    }
  }, [enabled])

  // Main animation loop
  useFrame((state, delta) => {
    if (!enabled) return
    
    // Track elapsed time since autoplay started
    if (autoPlay && autoPlayStartTimeRef.current !== null) {
      elapsedTimeRef.current += delta
    }
    
    addParticles(delta)
    updateParticles(delta)
    updateGeometry()
    
    // Debug logging
    if (logEmitterPosition && state.clock.elapsedTime % 1 < delta) {
      console.log('Emitter Position:', emitterPositionRef.current.toArray())
    }
    
    if (logParticleCount && state.clock.elapsedTime % 1 < delta) {
      console.log('Particle Count:', particlesRef.current.length, '/ Max:', maxParticles)
    }
    
    if (showTimingInfo && state.clock.elapsedTime % 1 < delta) {
      console.log('Timing Info:', {
        elapsedTime: elapsedTimeRef.current.toFixed(2) + 's',
        autoPlay: autoPlay,
        startTime: startTime + 's',
        endTime: endTime + 's',
        shouldEmit: elapsedTimeRef.current >= startTime,
        status: elapsedTimeRef.current < startTime ? 'waiting' : 
               elapsedTimeRef.current <= endTime ? 'emitting' : 'residual'
      })
    }
    
    if (showDebugInfo && state.clock.elapsedTime % 2 < delta) {
      const effectiveRate = getEffectiveEmissionRate(elapsedTimeRef.current)
      console.log('Smoke Debug:', {
        particleCount: particlesRef.current.length,
        emitterPosition: emitterPositionRef.current.toArray(),
        accumulator: accumulatorRef.current,
        enabled: enabled,
        autoPlay: autoPlay,
        elapsedTime: elapsedTimeRef.current.toFixed(2),
        baseEmissionRate: emissionRate,
        effectiveEmissionRate: effectiveRate.toFixed(2)
      })
    }
  })

  // Don't render anything if disabled
  if (!enabled) return null

  return (
    <points {...props}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[bufferArraysRef.current.positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[bufferArraysRef.current.sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[bufferArraysRef.current.colors, 4]} />
        <bufferAttribute attach="attributes-angle" args={[bufferArraysRef.current.angles, 1]} />
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
