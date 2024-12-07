import './style.css'
import ReactDOM from 'react-dom/client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

import Experience from './Experience.jsx'
import LeetCodeDashboard from './components/LeetCodeDashboard.jsx'


studio.extend(extension)
// studio.initialize()

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    <div className="relative w-full h-full">
      <Canvas gl={{ preserveDrawingBuffer: true }}>   
        <Experience />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <LeetCodeDashboard />
      </div>
    </div>
  </React.StrictMode>
)