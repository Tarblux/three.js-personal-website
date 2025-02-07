import React, { useEffect } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function Landscape(props) {

  const { nodes, materials } = useGLTF('/models/Landscape.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/bakerstee.jpg')
  bakedTexture.flipY = false

  useEffect(() => {
    bakedTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
    bakedTexture.minFilter = THREE.LinearMipMapLinearFilter
  }, [bakedTexture, gl])

  return (
      <group {...props} dispose={null}>
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

useGLTF.preload('/models/Landscape.glb')
