import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function ProjectLabs(props) {
  const { nodes } = useGLTF('/models/projects.glb')
  
  const bakedTexture = useSmartTexture('projects')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale = {100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.projects.geometry}
        position={[-3.585, 0.175, 0.109]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/projects.glb')
