import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Field(props) {
  const { nodes } = useGLTF('/models/field.glb')
  const bakedTexture = useTexture('/textures/field.webp')
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
