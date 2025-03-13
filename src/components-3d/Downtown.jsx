import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function Downtown(props) {
  const { nodes } = useGLTF('/models/downtown.glb')
  const bakedTexture = useTexture('/textures/downtown.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.downtown.geometry}
          position={[-3.739, 0.20154, 1.472]}
          rotation={[1.592, 0.006, 1.6]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/downtown.glb')
