import './style.css'
import ReactDOM from 'react-dom/client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

import Experience from './Experience.jsx'

studio.extend(extension)
studio.initialize()

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    <Canvas gl={{ preserveDrawingBuffer: true }} flat>   
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  </React.StrictMode>
)

