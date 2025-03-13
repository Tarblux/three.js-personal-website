import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function Recreation(props) {
  const { nodes } = useGLTF('/models/recreation.glb')
  const bakedTexture = useTexture('/textures/recreation.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.recreation.geometry}
          position={[-3.547, 0.266, 2.451]}
          rotation={[Math.PI / 2, 0, 1.582]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/recreation.glb')
