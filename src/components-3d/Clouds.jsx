import React, { useRef } from 'react'
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Clouds as DreiClouds, Cloud } from "@react-three/drei"
import { useCloudControls } from "../hooks/useCloudControls.js"

export function Clouds(props) {
  const ref = useRef()
  const cloud0 = useRef()
  
  const {
    enabled,
    seed,
    segments,
    volume,
    opacity,
    fade,
    growth,
    speed,
    x,
    y,
    z,
    range,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    rotationSpeed,
  } = useCloudControls()

  const cloudConfig = {
    seed,
    segments,
    volume,
    opacity,
    fade,
    growth,
    speed,
  }

  useFrame((state, delta) => {
    if (ref.current) {
      // Very subtle horizontal drift
      ref.current.position.x += Math.sin(state.clock.elapsedTime * 0.1) * rotationSpeed * 0.01
      ref.current.position.z += Math.cos(state.clock.elapsedTime * 0.08) * rotationSpeed * 0.01
      
      // Minimal rotation - like gentle wind
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.05) * rotationSpeed * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * rotationSpeed * 0.01
    }
    if (cloud0.current) {
      // Very slow individual cloud rotation
      cloud0.current.rotation.y += delta * rotationSpeed * 0.05
    }
  })

  // Don't render anything if clouds are disabled
  if (!enabled) {
    return null
  }

  return (
    <group 
      {...props} 
      ref={ref}
      position={[positionX, positionY, positionZ]}
      scale={scaleMultiplier}
    >
      
      <DreiClouds material={THREE.MeshBasicMaterial} limit={100} range={range}>
        <Cloud 
          ref={cloud0} 
          {...cloudConfig} 
          bounds={[x, y, z]} 
          color={color} 
        />

      </DreiClouds>
    </group>
  )
} 