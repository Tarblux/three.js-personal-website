import React, { useRef, useMemo, useState } from 'react'
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Clouds as DreiClouds, Cloud } from "@react-three/drei"
import { useFactorySmokeControls } from "../hooks/useFactorySmokeControls.js"

export function FactorySmoke(props) {
  const {
    enabled,
    stackCount,
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
    stackSpacing,
  } = useFactorySmokeControls()

  // Create refs for each puff across all stacks
  const puffRefs = useRef([])
  
  // Initialize puff refs array
  if (puffRefs.current.length !== stackCount * puffCount) {
    puffRefs.current = Array(stackCount * puffCount).fill(null).map((_, i) => 
      puffRefs.current[i] || React.createRef()
    )
  }

  // Create unique seeds and initial positions for each stack
  const stackData = useMemo(() => {
    return Array(stackCount).fill(null).map((_, stackIndex) => {
      const stackX = (stackIndex - (stackCount - 1) / 2) * stackSpacing
      
      return {
        stackIndex,
        stackX,
        puffData: Array(puffCount).fill(null).map((_, puffIndex) => ({
          seed: stackIndex * 100 + puffIndex + 1,
          initialOffset: puffIndex * puffOffset,
          driftSeed: stackIndex * 0.5 + puffIndex * 0.3,
          spawnTime: puffIndex * puffOffset * 0.5,
        }))
      }
    })
  }, [stackCount, puffCount, puffOffset, stackSpacing])

  // Track individual puff ages and fade progress for each stack
  const puffAges = useRef(Array(stackCount * puffCount).fill(0))
  const puffScales = useRef(Array(stackCount * puffCount).fill(1))
  const [fadeProgresses, setFadeProgresses] = useState(Array(stackCount * puffCount).fill(0))

  useFrame((state, delta) => {
    if (!enabled) return

    const newFadeProgresses = [...fadeProgresses]
    
    stackData.forEach((stack, stackIndex) => {
      stack.puffData.forEach((puff, puffIndex) => {
        const globalIndex = stackIndex * puffCount + puffIndex
        const ref = puffRefs.current[globalIndex]?.current
        
        if (ref) {
          // Update age
          puffAges.current[globalIndex] += delta
          
          // Calculate fade and scale based on age
          const age = puffAges.current[globalIndex]
          const maxAge = resetHeight / riseSpeed
          const fadeProgress = Math.min(age / maxAge, 1)
          newFadeProgresses[globalIndex] = fadeProgress
          
          // Rise upward
          ref.position.y += delta * riseSpeed
          
          // Add drift with individual variation (increases with age)
          const driftMultiplier = 1 + fadeProgress * 2 // Drift more as it gets older
          ref.position.x += Math.sin(state.clock.elapsedTime + puff.driftSeed) * driftAmount * delta * driftMultiplier
          ref.position.z += Math.cos(state.clock.elapsedTime * 0.7 + puff.driftSeed) * driftAmount * delta * driftMultiplier
          
          // Slight rotation for realism
          ref.rotation.y += delta * 0.1
          
          // Expand as it rises (smoke disperses)
          const expansionAmount = 1 + fadeProgress * expansion
          puffScales.current[globalIndex] = expansionAmount
          ref.scale.setScalar(expansionAmount)
          
          // Reset when too old/high - spawn new puff
          if (age > maxAge || ref.position.y > resetHeight) {
            ref.position.y = -puff.initialOffset
            ref.position.x = 0
            ref.position.z = 0
            ref.scale.setScalar(1)
            puffAges.current[globalIndex] = 0
            puffScales.current[globalIndex] = 1
            newFadeProgresses[globalIndex] = 0
          }
        }
      })
    })
    
    setFadeProgresses(newFadeProgresses)
  })

  if (!enabled) return null

  return (
    <group 
      {...props} 
      position={[positionX, positionY, positionZ]}
      scale={scaleMultiplier}
      rotation={[0, Math.PI / 2, 0]}
    >
      {stackData.map((stack, stackIndex) => (
        <group key={stackIndex} position={[stack.stackX, 0, 0]}>
          <DreiClouds material={THREE.MeshBasicMaterial} limit={200} range={100}>
            {stack.puffData.map((puff, puffIndex) => {
              const globalIndex = stackIndex * puffCount + puffIndex
              const fadeProgress = fadeProgresses[globalIndex] || 0
              
              // Start at full opacity, fade to 0 as it rises
              const dynamicOpacity = opacity * (1 - fadeProgress * fadeStrength)
              
              return (
                <Cloud
                  key={puffIndex}
                  ref={puffRefs.current[globalIndex]}
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
      ))}
    </group>
  )
} 