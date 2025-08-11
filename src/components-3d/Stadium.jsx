import React from 'react'
import { useGLTF, useVideoTexture, useTexture } from '@react-three/drei'

export function Stadium(props) {
  const { nodes } = useGLTF('/models/stadium.glb')
  const videoTexture = useVideoTexture('/videos/reiss.mp4')
  const bakedTexture = useTexture('/textures/stadium.webp')
  bakedTexture.flipY = false
  
  // Flip the video texture using UV scaling
  videoTexture.repeat.set(1, -1)
  videoTexture.offset.set(0, 1)
  
  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes['stadium-panel'].geometry}
        position={[-3.547, 0.266, 2.451]}
        rotation={[Math.PI / 2, 0, 1.582]}
      >
        <meshStandardMaterial map={videoTexture} />
      </mesh>
      <mesh
        geometry={nodes.stadium.geometry}
        position={[-3.547, 0.266, 2.451]}
        rotation={[Math.PI / 2, 0, 1.582]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/stadium.glb')
