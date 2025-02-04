import React from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Landscape(props) {

  const { nodes, materials } = useGLTF('/models/landscape.glb')

  const bakedTexture = useTexture('/images/bakersteez.jpg')
  bakedTexture.flipY = false


  return (
    <Center>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Landscape.geometry}
          position={[-2.57896638, 0.0462811, 2.57479477]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </Center>
  )
}

useGLTF.preload('/models/landscape.glb')
