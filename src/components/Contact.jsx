import React, { useEffect } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Contact(props) {

  const { nodes, materials } = useGLTF('/models/contact.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/contact.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null}>
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
