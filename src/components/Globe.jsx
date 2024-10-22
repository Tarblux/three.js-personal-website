import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Globe(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/globe.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cloud_1"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_1.geometry}
          material={materials.Clouds}
          position={[0, 1.3, 0]}
        />
        <mesh
          name="Cloud_2"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_2.geometry}
          material={materials.Clouds}
          position={[-1.2, 0.9, 0.1]}
        />
        <mesh
          name="Cloud_3"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_3.geometry}
          material={materials.Clouds}
          position={[-1.4, -0.1, 0.5]}
        />
        <mesh
          name="Cloud_5"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_5.geometry}
          material={materials.Clouds}
          position={[1.3, -0.2, 0.5]}
        />
        <mesh
          name="Cloud_4"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_4.geometry}
          material={materials.Clouds}
          position={[1.1, 0.9, -0.9]}
        />
        <mesh
          name="Cloud_6"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_6.geometry}
          material={materials.Clouds}
          position={[0.8, -1.2, -0.6]}
          rotation={[0, 0, 2]}
        />
        <mesh
          name="Cloud_7"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_7.geometry}
          material={materials.Clouds}
          position={[-0.6, -0.6, 1.4]}
          scale={0.7}
        />
        <mesh
          name="Cloud_8"
          castShadow
          receiveShadow
          geometry={nodes.Cloud_8.geometry}
          material={materials.Clouds}
          position={[-0.7, -1.3, 0]}
          rotation={[-1.6, -0.4, -1.8]}
          scale={0.7}
        />
        <mesh
          name="Low_Poly_Earth001"
          castShadow
          receiveShadow
          geometry={nodes.Low_Poly_Earth001.geometry}
          material={materials.Ground}
        />
        <mesh
          name="Ocean"
          castShadow
          receiveShadow
          geometry={nodes.Ocean.geometry}
          material={materials.Ocean}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/globe.glb')
