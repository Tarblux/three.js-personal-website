import './style.css'
import ReactDOM from 'react-dom/client'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

import Experience from './Experience.jsx'
import LoadedButton from './components/LoadedButton.jsx'

if (import.meta.env.DEV) {
  studio.extend(extension)
  studio.initialize()
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Loader({ onBoardingPassClick }) {
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

  return (
    <div id="loader">
      <div className="loading-message">Building city...</div>
      <video src="/images/city-loading.mp4" autoPlay muted className="loading-video" />
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-percentage">{Math.round(progress)}%</div>
      {isLoaded && <LoadedButton onBoardingPassClick={onBoardingPassClick} />}
    </div>
  )
}

function App() {

  const [disableScroll, setDisableScroll] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)

  const handleBoardingPassClick = () => {
    const loader = document.getElementById("loader")
    if (loader) {
      loader.classList.add("fade-out")
      setTimeout(() => {
        loader.style.display = "none"
      }, 1000);
    }

    setAutoPlay(true)
  };

  return (
    <>
      <Loader onBoardingPassClick={handleBoardingPassClick} />
      <Canvas gl={{ preserveDrawingBuffer: true }} flat>
        <Suspense fallback={null}>
          <Experience
            disableScroll={disableScroll}
            setDisableScroll={setDisableScroll}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
          />
        </Suspense>
      </Canvas>
      <SpeedInsights />
      <Analytics />
    </>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
