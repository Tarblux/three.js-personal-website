import './style.css'
import ReactDOM from 'react-dom/client'
import React , { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'


import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.extend(extension)
studio.initialize()

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <React.StrictMode>
        <Suspense fallback={null}>
            <Canvas gl={{ preserveDrawingBuffer: true }}>   
                <Experience />
            </Canvas>
        </Suspense>
    </React.StrictMode>
)