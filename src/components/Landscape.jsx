import React, { useRef } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

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
          material={new MeshBasicMaterial({ map: bakedTexture })}
          position={[-2.57896638, 0.0462811, 2.57479477]}
        />
      </group>
    </Center>
  )
}

useGLTF.preload('/models/landscape.glb')
