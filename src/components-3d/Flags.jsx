import { useRef, useMemo, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useFlagsControls } from '../hooks/useFlagsControls'

const Flag = ({ position, texture, animationOffset, flagDimensions, animationParams, spacing }) => {
  const meshRef = useRef()
  const geometryRef = useRef()
  
  // Load texture (let Suspense handle loading/errors)
  const flagTexture = useLoader(TextureLoader, texture)
  
  // Set texture filtering
  useMemo(() => {
    if (flagTexture) {
      flagTexture.magFilter = THREE.LinearFilter
      flagTexture.minFilter = THREE.LinearFilter
      flagTexture.wrapS = THREE.ClampToEdgeWrapping
      flagTexture.wrapT = THREE.ClampToEdgeWrapping
      flagTexture.flipY = false
    }
  }, [flagTexture, texture])
  
  // Animation parameters 
  const finalAnimationParams = useMemo(() => ({
    horizontal: animationParams.horizontal,
    vertical: animationParams.vertical,
    waveHeight: animationParams.waveHeight,
    speed: animationParams.speed,
    offset: [animationOffset.x, animationOffset.y]
  }), [animationParams, animationOffset])
  
  const [flagWidth, flagHeight] = flagDimensions
  const [segW, segH] = [30, 20] // Segments for geometry subdivision
  
  useFrame((state) => {
    if (geometryRef.current) {
      const geometry = geometryRef.current
      const positionAttribute = geometry.attributes.position
      const time = state.clock.elapsedTime * finalAnimationParams.speed
      
      // Update vertices based on the original algorithm
      for (let y = 0; y <= segH; y++) {
        for (let x = 0; x <= segW; x++) {
          const index = x + y * (segW + 1)
          
          // Get original position
          const originalX = positionAttribute.array[index * 3]
          const originalY = positionAttribute.array[index * 3 + 1]
          
          // Calculate wave displacement
          const wave = Math.sin(
            finalAnimationParams.horizontal * x + 
            finalAnimationParams.vertical * y - 
            time +
            finalAnimationParams.offset[0]
          ) * finalAnimationParams.waveHeight * x / 4
          
          // Update Z position (wave effect)
          positionAttribute.array[index * 3 + 2] = wave
        }
      }
      
      positionAttribute.needsUpdate = true
      geometry.computeVertexNormals() // Recalculate normals for proper lighting
    }
  })
  
  return (
    <group position={position}>
      
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees around Y-axis
      >
                 <planeGeometry 
           ref={geometryRef}
           args={[flagWidth, flagHeight, segW, segH]} 
         />
         <meshBasicMaterial
           map={flagTexture}
           side={THREE.DoubleSide}
           transparent={false}
         />
      </mesh>
    </group>
  )
}

const FlagGroup = ({ groupPosition, flags, flagDimensions, animationParams, flagSpacing, scale }) => {
  // Calculate positions within this group
  const flagPositions = useMemo(() => {
    return flags.map((_, flagIndex) => {
      // Reverse flag order within the group for correct display order
      const reversedFlagIndex = flags.length - 1 - flagIndex
      const flagOffsetZ = reversedFlagIndex * flagSpacing - ((flags.length - 1) * flagSpacing) / 2
      return [0, 0, flagOffsetZ]
    })
  }, [flags.length, flagSpacing])

  return (
    <group position={groupPosition} scale={scale}>
      <Suspense fallback={<mesh><boxGeometry args={[0.5, 0.5, 0.5]} /><meshBasicMaterial color="gray" /></mesh>}>
        {flags.map((flag, index) => (
          <Flag
            key={index}
            position={flagPositions[index]}
            texture={flag.texture}
            animationOffset={flag.offset}
            flagDimensions={flagDimensions}
            animationParams={animationParams}
            spacing={flagSpacing}
          />
        ))}
      </Suspense>
    </group>
  )
}

export const Flags = (props) => {
  const { scale, flagDimensions, animationParams, flagSpacing, group1Position, group2Position } = useFlagsControls()
  
  // Flag data organized in two groups
  const flagGroups = useMemo(() => [
    // Group 1: BR, JA, MX
    {
      name: "Group1",
      position: group1Position,
      flags: [
        { texture: '/images/flags/BR.jpeg', offset: { x: 0, y: 0 } },
        { texture: '/images/flags/JA.png', offset: { x: 1.2, y: 0.3 } },
        { texture: '/images/flags/MX.jpeg', offset: { x: 2.1, y: 0.7 } }
      ]
    },
    // Group 2: KR, GR, FR
    {
      name: "Group2", 
      position: group2Position,
      flags: [
        { texture: '/images/flags/KR.jpeg', offset: { x: 0.8, y: 1.1 } },
        { texture: '/images/flags/GR.jpeg', offset: { x: 1.7, y: 0.4 } },
        { texture: '/images/flags/FR.jpeg', offset: { x: 2.3, y: 0.9 } }
      ]
    }
  ], [group1Position, group2Position])
  
  return (
    <group {...props}>
      {flagGroups.map((group) => (
        <FlagGroup
          key={group.name}
          groupPosition={group.position}
          flags={group.flags}
          flagDimensions={flagDimensions}
          animationParams={animationParams}
          flagSpacing={flagSpacing}
          scale={scale}
        />
      ))}
    </group>
  )
} 