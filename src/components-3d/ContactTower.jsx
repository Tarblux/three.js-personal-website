import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function ContactTower(props) {
  const { nodes } = useGLTF('/models/contact.glb')
  const bakedTexture = useTexture('/textures/contact.webp')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          geometry={nodes.contact.geometry}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/contact.glb')
