import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Booch(props) {
  const { nodes } = useGLTF('/models/booch.glb')
  const bakedTexture = useTexture('/textures/booch.webp')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes.Booch.geometry}
        position={[-3.294, 0.2, 1.73]}
        rotation={[Math.PI / 2, 0, -1.548]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/booch.glb')
