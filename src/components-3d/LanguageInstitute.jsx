import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function LanguageInstitute(props) {

  const { nodes, materials } = useGLTF('/models/language-institute.glb')
  const { gl } = useThree()

  const bakedTexture = useSmartTexture('language-institute')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100} >
        <mesh
          geometry={nodes['language-institute'].geometry}
          position={[-4.482, 0.258, 2.023]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

  )
}

useGLTF.preload('/models/language-institute.glb')