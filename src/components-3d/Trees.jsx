import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Trees(props) {
  const { nodes } = useGLTF('/models/trees.glb')
  const bakedTexture = useTexture('/textures/trees.webp')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trees.geometry}
        position={[-2.158, 0.199, 1.234]}
        rotation={[Math.PI / 2, 0, 2.812]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/trees.glb')
