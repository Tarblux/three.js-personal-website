import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function ContactTower(props) {
  const { nodes } = useGLTF('/models/contact.glb')
  const bakedTexture = useTexture('/textures/contact.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.contact.geometry}
          position={[-0.424, 1.021, 2.085]}
          rotation={[Math.PI / 2, -0.01, -1.616]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/contact.glb')
