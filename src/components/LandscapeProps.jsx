import React, { useEffect } from 'react'
import { useGLTF, useTexture, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function LandscapeProps(props) {

  const { nodes, materials } = useGLTF('/models/landscape-props.glb')
  const { gl } = useThree()

  const bakedTexture = useTexture('/textures/landscape-props.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes['landscape-props_Baked'].geometry}
        position={[-1.639, 0.2335, 1.506]}
        rotation={[0, -0.016, Math.PI / 2]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}


useGLTF.preload('/landscape-props.glb')
