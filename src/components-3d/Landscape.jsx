import React, { useEffect } from 'react'
import { useGLTF, useTexture} from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Landscape(props) {

  const { nodes, materials } = useGLTF('/models/landscape.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/landscape.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Landscape_Baked.geometry}
          position={[-2.57896638, 0.0462811, 2.57479477]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/landscape.glb')
