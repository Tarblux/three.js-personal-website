import React from 'react'
import { useGLTF} from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function Campus(props) {
  const { nodes } = useGLTF('/models/campus.glb')
  
  const bakedTexture = useSmartTexture('campus')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.campus.geometry}
          position={[-4.377, 0.212, 0.682]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/campus.glb')
