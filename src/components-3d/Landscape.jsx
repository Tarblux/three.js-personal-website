import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Landscape(props) {
  const { nodes } = useGLTF('/models/landscape.glb')
  const bakedTexture = useTexture('/textures/landscape.webp')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.landscape.geometry}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/landscape.glb')