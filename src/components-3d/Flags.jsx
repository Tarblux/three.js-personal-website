import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export const Flags = (props) => {
  const { nodes } = useGLTF('/models/flags.glb')
  
  const bakedTexture = useSmartTexture('flags')
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

// useGLTF.preload('/models/flags.glb') 