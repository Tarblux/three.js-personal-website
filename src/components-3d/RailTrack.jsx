import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function RailTrack(props) {
  const { nodes } = useGLTF('/models/railtrack.glb')
  
  const bakedTexture = useSmartTexture('railtrack')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes.railtrack.geometry}
        position={[-1.635, 0.175, 1.51]}
        rotation={[Math.PI / 2, 0, -1.553]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/railtrack.glb')
