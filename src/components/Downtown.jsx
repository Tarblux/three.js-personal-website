import React, { useEffect } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Downtown(props) {

  const { nodes, materials } = useGLTF('/models/downtown.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/downtown.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.downtown.geometry}
          position={[-3.739, 0.20154, 1.472]}
          rotation={[1.592, 0.006, 1.6]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

  )
}

useGLTF.preload('/models/downtown.glb')
