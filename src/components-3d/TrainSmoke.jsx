import React, { useRef, useMemo, useState } from 'react'
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
    fadeStrength,
    expansion,
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
      spawnTime: i * puffOffset * 0.5, // Stagger spawn times
    }))
  }, [puffCount, puffOffset])

  // Track individual puff ages and fade progress
  const puffAges = useRef(Array(puffCount).fill(0))
  const puffScales = useRef(Array(puffCount).fill(1))
  const [fadeProgresses, setFadeProgresses] = useState(Array(puffCount).fill(0))

  useFrame((state, delta) => {
    if (!enabled) return

    const newFadeProgresses = [...fadeProgresses]
    
    puffRefs.current.forEach((ref, i) => {
      if (ref.current) {
        const puff = puffData[i]
        
        // Update age
        puffAges.current[i] += delta
        
        // Calculate fade and scale based on age
        const age = puffAges.current[i]
        const maxAge = resetHeight / riseSpeed
        const fadeProgress = Math.min(age / maxAge, 1)
        newFadeProgresses[i] = fadeProgress
        
        // Rise upward
        ref.current.position.y += delta * riseSpeed
        
        // Add drift with individual variation (increases with age)
        const driftMultiplier = 1 + fadeProgress * 2 // Drift more as it gets older
        ref.current.position.x += Math.sin(state.clock.elapsedTime + puff.driftSeed) * driftAmount * delta * driftMultiplier
        ref.current.position.z += Math.cos(state.clock.elapsedTime * 0.7 + puff.driftSeed) * driftAmount * delta * driftMultiplier
        
        // Slight rotation for realism
        ref.current.rotation.y += delta * 0.1
        
        // Expand as it rises (smoke disperses)
        const expansionAmount = 1 + fadeProgress * expansion
        puffScales.current[i] = expansionAmount
        ref.current.scale.setScalar(expansionAmount)
        
        // Reset when too old/high - spawn new puff
        if (age > maxAge || ref.current.position.y > resetHeight) {
          ref.current.position.y = -puff.initialOffset
          ref.current.position.x = 0
          ref.current.position.z = 0
          ref.current.scale.setScalar(1)
          puffAges.current[i] = 0
          puffScales.current[i] = 1
          newFadeProgresses[i] = 0
        }
      }
    })
    
    setFadeProgresses(newFadeProgresses)
  })

  if (!enabled) return null

  return (
    <group 
      {...props} 
      position={[positionX, positionY, positionZ]}
      scale={scaleMultiplier}
    >
      <DreiClouds material={THREE.MeshBasicMaterial} limit={200} range={100}>
        {puffData.map((puff, i) => {
          // Use tracked fade progress
          const fadeProgress = fadeProgresses[i] || 0
          
          // Start at full opacity, fade to 0 as it rises
          const dynamicOpacity = opacity * (1 - fadeProgress * fadeStrength) // Fade based on controls
          
          return (
            <Cloud
              key={i}
              ref={puffRefs.current[i]}
              seed={puff.seed}
              segments={segments}
              bounds={bounds}
              volume={volume}
              opacity={Math.max(dynamicOpacity, 0.05)} // Minimum opacity
              fade={fade}
              color={color}
              speed={0.1}
              growth={2}
              position={[0, -puff.initialOffset, 0]}
            />
          )
        })}
      </DreiClouds>
    </group>
  )
} 