import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Fences(props) {
  const { nodes } = useGLTF('/models/fences.glb')
  
  const bakedTexture = useSmartTexture('fences')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fences.geometry}
        position={[-0.333, 0.879, 2.171]}
        rotation={[Math.PI / 2, 0, -1.557]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/fences.glb')
