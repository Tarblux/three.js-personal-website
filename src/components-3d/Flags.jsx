import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export const Flags = (props) => {
  const { nodes } = useGLTF('/models/flags.glb')
  const bakedTexture = useTexture('/textures/flags.webp')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale = {100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flags_Baked.geometry}
        position={[-4.384, 0.175, 1.854]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/flags.glb') 