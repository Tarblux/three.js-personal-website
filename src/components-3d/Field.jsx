import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Field(props) {
  const { nodes } = useGLTF('/models/field.glb')
  
  const bakedTexture = useSmartTexture('field')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes.field_Baked.geometry}
        position={[-2.94625688, 0.19261803, 1.99664366]}
        rotation={[Math.PI / 2, 0, 0.78995235]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/field.glb')
