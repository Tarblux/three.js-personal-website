import './style.css'
import ReactDOM from 'react-dom/client'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

import Experience from './Experience.jsx'
import LoadedButton from './components/LoadedButton.jsx'

studio.extend(extension)
studio.initialize()

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Loader() {
  const { progress } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true)
      const loadingMessage = document.querySelector('.loading-message')
      if (loadingMessage) {
        loadingMessage.classList.add('fade-out-message')
      }
    }
  }, [progress])

  const handleFadeOut = () => {
    const loader = document.getElementById('loader')
    if (loader) {
      loader.classList.add('fade-out')
      setTimeout(() => {
        loader.style.display = 'none'
      }, 1000) // Match the transition duration
    }
  }

  return (
    <div id="loader">
      <div className="loading-message">Building city...</div>
      <video src="/images/city-loading.mp4" autoPlay muted className="loading-video" />
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-percentage">{Math.round(progress)}%</div>
      {isLoaded && <LoadedButton onFadeOut={handleFadeOut} />}
    </div>
  )
}

function App() {
  return (
    <>
      <Loader />
      <Canvas gl={{ preserveDrawingBuffer: true }} flat>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

