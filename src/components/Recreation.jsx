import React, { useEffect } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Recreation(props) {

  const { nodes, materials } = useGLTF('/models/recreation.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/recreation.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.recreation.geometry}
          position={[-3.547, 0.266, 2.451]}
          rotation={[Math.PI / 2, 0, 1.582]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

  )
}

useGLTF.preload('/models/recreation.glb')
