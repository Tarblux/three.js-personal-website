import React, { useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import tickerVertex from '../shaders/tickerVertex.glsl?raw'
import tickerFragment from '../shaders/tickerFragment.glsl?raw'

export function Downtown(props) {
  const { nodes } = useGLTF('/models/downtown.glb')

  // Baked texture for downtown only
  const bakedTexture = useTexture('/textures/downtown.webp')
  bakedTexture.flipY = false

  // Load stock slider textures
  const sliderTextures = useLoader(TextureLoader, [
    '/textures/stock-slider.webp',
    '/textures/stock-slider2.webp',
    '/textures/stock-slider3.webp',
    '/textures/stock-slider4.webp',
    '/textures/stock-slider5.webp',
  ])

  // Create shader material for the stock panel
  const tickerMaterial = useMemo(() => {
    sliderTextures.forEach((tex) => {
      tex.flipY = false
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
    })

    return new THREE.ShaderMaterial({
      vertexShader: tickerVertex,
      fragmentShader: tickerFragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.07 },
        uTexture1: { value: sliderTextures[0] },
        uTexture2: { value: sliderTextures[1] },
        uTexture3: { value: sliderTextures[2] },
        uTexture4: { value: sliderTextures[3] },
        uTexture5: { value: sliderTextures[4] },
      },
      transparent: false,
    })
  }, [sliderTextures])

  // Animate time for the ticker
  useFrame((state) => {
    if (tickerMaterial) {
      tickerMaterial.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group {...props} dispose={null} scale={100}>
      {/* Stock panel with custom shader material */}
      <mesh
        geometry={nodes['stock-panel1'].geometry}
        position={[-3.58434844, 0.50036126, 1.04155684]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        material={tickerMaterial}
      />

      {/* Downtown with baked texture */}
      <mesh
        geometry={nodes.downtown.geometry}
        position={[-3.522, 0.186, 1.54]}
        rotation={[Math.PI / 2, 0, -3.123]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/downtown.glb')
