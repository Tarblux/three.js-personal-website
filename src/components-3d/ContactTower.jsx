import React from 'react'
import { useGLTF} from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function ContactTower(props) {
  const { nodes } = useGLTF('/models/contact.glb')
  
  const bakedTexture = useSmartTexture('contact')
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
