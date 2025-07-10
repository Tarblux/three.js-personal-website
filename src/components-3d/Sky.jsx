import React from 'react'
import { Sky as DreiSky } from "@react-three/drei"
import { useSkyControls } from "../hooks/useSkyControls.js"

export function Sky(props) {
  const { 
    turbidity, 
    rayleigh, 
    mieCoefficient, 
    mieDirectionalG, 
    sunPosition, 
    distance 
  } = useSkyControls()

  return (
    <DreiSky 
      {...props}
      turbidity={turbidity} 
      rayleigh={rayleigh} 
      mieCoefficient={mieCoefficient} 
      mieDirectionalG={mieDirectionalG} 
      sunPosition={sunPosition} 
      distance={distance}
    />
  )
} 