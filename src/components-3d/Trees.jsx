import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Trees(props) {
  const { nodes } = useGLTF('/models/trees.glb')
  
  const bakedTexture = useSmartTexture('trees')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trees.geometry}
        position={[-2.15848, 0.198627, 1.233697]}
        rotation={[Math.PI / 2, 0, 2.811954]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/trees.glb')
