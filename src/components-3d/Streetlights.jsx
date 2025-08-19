import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Streetlights(props) {
  const { nodes } = useGLTF('/models/streetlights.glb')
  
  const bakedTexture = useSmartTexture('streetlights')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes.streetlights.geometry}
        position={[-4.01, 0.236, 2.521]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/streetlights.glb')
