import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'

export function ChessPark(props) {
  const { nodes } = useGLTF('/models/chesspark.glb')
  
  const bakedTexture = useSmartTexture('chesspark')
  bakedTexture.flipY = false

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes.chesspark.geometry}
        position={[-3.019, 0.175, 1.777]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.955, 1, 1]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/chesspark.glb')
