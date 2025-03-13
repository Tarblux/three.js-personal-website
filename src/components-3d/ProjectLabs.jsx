import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function ProjectLabs(props) {
  const { nodes } = useGLTF('/models/projects.glb')
  const bakedTexture = useTexture('/textures/projects.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.projexts_Baked.geometry}
          position={[-2.648, 0.245, 0.205]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/projects.glb')
