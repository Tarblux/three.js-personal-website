import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei'

export function LandscapeProps(props) {
  const { nodes } = useGLTF('/models/landscape-props.glb')
  const bakedTexture = useTexture('/textures/landscape-props.jpg')
  bakedTexture.flipY = false

  return (
      <group {...props} dispose={null} scale = {100}>
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

useGLTF.preload('/models/landscape-props.glb')
