import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Booch(props) {
  const { nodes } = useGLTF('/models/booch.glb')
  
  const bakedTexture = useSmartTexture('booch')
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
