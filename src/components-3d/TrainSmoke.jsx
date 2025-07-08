import React, { useRef, useMemo } from 'react'
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Clouds as DreiClouds, Cloud } from "@react-three/drei"
import { useSmokeControls } from "../hooks/useSmokeControls.js"

export function TrainSmoke(props) {
  const {
    puffCount,
    segments,
    volume,
    opacity,
    fade,
    riseSpeed,
    resetHeight,
    bounds,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    driftAmount,
    puffOffset,
    enabled,
  } = useSmokeControls()

  // Create refs for each puff
  const puffRefs = useRef([])
  
  // Initialize puff refs array
  if (puffRefs.current.length !== puffCount) {
    puffRefs.current = Array(puffCount).fill(null).map((_, i) => 
      puffRefs.current[i] || React.createRef()
    )
  }

  // Create unique seeds and initial positions for each puff
  const puffData = useMemo(() => {
    return Array(puffCount).fill(null).map((_, i) => ({
      seed: i + 1,
      initialOffset: i * puffOffset,
      driftSeed: i * 0.5,
    }))
  }, [puffCount, puffOffset])

  useFrame((state, delta) => {
    if (!enabled) return

    puffRefs.current.forEach((ref, i) => {
      if (ref.current) {
        const puff = puffData[i]
        
        // Rise upward
        ref.current.position.y += delta * riseSpeed
        
        // Add drift with individual variation
        ref.current.position.x += Math.sin(state.clock.elapsedTime + puff.driftSeed) * driftAmount * delta
        ref.current.position.z += Math.cos(state.clock.elapsedTime * 0.7 + puff.driftSeed) * driftAmount * delta
        
        // Slight rotation for realism
        ref.current.rotation.y += delta * 0.1
        
        // Reset when too high
        if (ref.current.position.y > resetHeight) {
          ref.current.position.y = -puff.initialOffset
          ref.current.position.x = 0
          ref.current.position.z = 0
        }
      }
    })
  })

  if (!enabled) return null

  return (
    <group 
      {...props} 
      position={[positionX, positionY, positionZ]}
      scale={scaleMultiplier}
    >
      <DreiClouds material={THREE.MeshBasicMaterial} limit={200} range={100}>
        {puffData.map((puff, i) => (
          <Cloud
            key={i}
            ref={puffRefs.current[i]}
            seed={puff.seed}
            segments={segments}
            bounds={bounds}
            volume={volume}
            opacity={opacity}
            fade={fade}
            color={color}
            speed={0.1}
            growth={2}
            position={[0, -puff.initialOffset, 0]}
          />
        ))}
      </DreiClouds>
    </group>
  )
} 