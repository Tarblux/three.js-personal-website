import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function Campus(props) {
  const { nodes } = useGLTF('/models/campus.glb')
  const bakedTexture = useTexture('/textures/campus.webp')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.campus.geometry}
          position={[-4.377, 0.212, 0.682]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/campus.glb')
