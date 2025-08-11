import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Streetlights(props) {
  const { nodes } = useGLTF('/models/streetlights.glb')
  const bakedTexture = useTexture('/textures/streetlights.webp')
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
