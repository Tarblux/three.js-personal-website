import React, { useEffect } from 'react'
import { useGLTF, useTexture} from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Campus(props) {

  const { nodes, materials } = useGLTF('/models/campus.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/campus.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.campus.geometry}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/Landscape.glb')
