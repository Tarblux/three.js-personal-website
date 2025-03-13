import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function Campus(props) {
  const { nodes } = useGLTF('/models/campus.glb')
  const bakedTexture = useTexture('/textures/campus.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.campus.geometry}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/campus.glb')
